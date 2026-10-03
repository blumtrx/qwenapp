"""
JobScraper - Web scraping module using BeautifulSoup
Scrapes job listings from multiple job boards
"""
import requests
from bs4 import BeautifulSoup
import yaml
import time
from datetime import datetime
from typing import List, Dict, Optional

class JobScraper:
    """Main scraper class for extracting job listings"""
    
    def __init__(self, config_path: str = 'config.yaml'):
        """Initialize scraper with configuration"""
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        })
        
        self.jobs = []
        self.logs = []
        
        # Load configuration
        try:
            with open(config_path, 'r') as f:
                self.config = yaml.safe_load(f)
        except FileNotFoundError:
            self.config = self._default_config()
    
    def _default_config(self) -> Dict:
        """Return default configuration"""
        return {
            'scraper': {
                'sources': [
                    {
                        'name': 'indeed',
                        'url': 'https://www.indeed.com/jobs?q=python+developer',
                        'selectors': {
                            'job_card': 'div.job_seen_beacon',
                            'title': 'h2.jobTitle a',
                            'company': 'span.companyName',
                            'location': 'div.companyLocation',
                            'salary': 'div.salary-snippet-container'
                        }
                    },
                    {
                        'name': 'linkedin',
                        'url': 'https://www.linkedin.com/jobs/search?keywords=python+developer',
                        'selectors': {
                            'job_card': 'div.base-card',
                            'title': 'h3.base-search-card__title',
                            'company': 'h4.base-search-card__subtitle',
                            'location': 'span.job-search-card__location',
                            'salary': None
                        }
                    }
                ],
                'schedule': {
                    'interval_minutes': 60,
                    'max_retries': 3
                }
            }
        }
    
    def log(self, level: str, message: str):
        """Add a log entry"""
        timestamp = datetime.now().strftime('%H:%M:%S')
        self.logs.append({
            'time': timestamp,
            'level': level,
            'message': message
        })
        print(f"[{timestamp}] {level}: {message}")
    
    def scrape_source(self, source_config: Dict) -> List[Dict]:
        """Scrape jobs from a single source"""
        source_name = source_config['name']
        url = source_config['url']
        selectors = source_config['selectors']
        
        self.log('INFO', f"Connecting to {source_name}...")
        start_time = time.time()
        
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            self.log('INFO', f"Parsing HTML with BeautifulSoup...")
            
            jobs = []
            job_cards = soup.select(selectors['job_card'])
            
            for card in job_cards[:10]:  # Limit to 10 jobs per source
                try:
                    job_data = self._extract_job_data(card, selectors, source_name)
                    if job_data:
                        jobs.append(job_data)
                except Exception as e:
                    self.log('WARNING', f"Failed to parse job card: {str(e)}")
                    continue
            
            elapsed = time.time() - start_time
            self.log('SUCCESS', f"✓ Scraped {len(jobs)} jobs from {source_name} ({elapsed:.1f}s)")
            
            return jobs
            
        except requests.RequestException as e:
            self.log('ERROR', f"Failed to scrape {source_name}: {str(e)}")
            return []
    
    def _extract_job_data(self, card, selectors: Dict, source_name: str) -> Optional[Dict]:
        """Extract job data from a single job card"""
        try:
            # Extract title
            title_elem = card.select_one(selectors['title'])
            title = title_elem.get_text(strip=True) if title_elem else 'Unknown Title'
            
            # Extract company
            company_elem = card.select_one(selectors['company'])
            company = company_elem.get_text(strip=True) if company_elem else 'Unknown Company'
            
            # Extract location
            location = 'Remote'
            if selectors.get('location'):
                location_elem = card.select_one(selectors['location'])
                if location_elem:
                    location = location_elem.get_text(strip=True)
            
            # Extract salary
            salary = 'Not specified'
            if selectors.get('salary'):
                salary_elem = card.select_one(selectors['salary'])
                if salary_elem:
                    salary = salary_elem.get_text(strip=True)
            
            # Extract link
            link = '#'
            link_elem = card.find('a', href=True)
            if link_elem:
                link = link_elem['href']
                if not link.startswith('http'):
                    link = f"https://www.{source_name}.com{link}"
            
            return {
                'id': hash(title + company),
                'title': title,
                'company': company,
                'location': location,
                'salary': salary,
                'type': 'Full-time',
                'posted': 'Recently',
                'description': f"Join {company} as a {title}. Great opportunity for skilled professionals.",
                'source': f"{source_name}.com",
                'tags': ['Python', 'Development'],
                'url': link,
                'scraped_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            self.log('ERROR', f"Extraction error: {str(e)}")
            return None
    
    def run_all(self) -> List[Dict]:
        """Run scraper on all configured sources"""
        self.log('INFO', 'Starting job scraper...')
        self.jobs = []
        
        sources = self.config['scraper']['sources']
        
        for source in sources:
            jobs = self.scrape_source(source)
            self.jobs.extend(jobs)
            time.sleep(1)  # Be polite, don't hammer servers
        
        self.log('SUCCESS', f"✓ Total: {len(self.jobs)} jobs scraped successfully")
        return self.jobs
    
    def get_jobs(self) -> List[Dict]:
        """Get all scraped jobs"""
        if not self.jobs:
            self.run_all()
        return self.jobs
    
    def get_sources(self) -> List[Dict]:
        """Get list of configured sources"""
        return [
            {
                'name': source['name'],
                'url': source['url'],
                'status': 'configured'
            }
            for source in self.config['scraper']['sources']
        ]
    
    def get_logs(self) -> List[Dict]:
        """Get scraper logs"""
        return self.logs

if __name__ == '__main__':
    # Test the scraper
    scraper = JobScraper()
    jobs = scraper.run_all()
    print(f"\n✅ Scraped {len(jobs)} jobs")
    for job in jobs[:3]:
        print(f"  - {job['title']} at {job['company']}")
