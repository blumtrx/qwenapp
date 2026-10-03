import React, { useState } from 'react';

const CodePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scraper' | 'flask' | 'parser'>('scraper');

  const codeSnippets = {
    scraper: `# scraper.py - Main scraper module
from bs4 import BeautifulSoup
import requests
import json
from datetime import datetime

class JobScraper:
    def __init__(self, config_path='config.yaml'):
        self.config = load_config(config_path)
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (compatible; JobScraper/2.1)'
        })
        self.results = []
    
    def scrape_indeed(self, query, location):
        """Scrape job listings from Indeed"""
        url = f"https://www.indeed.com/jobs?q={query}&l={location}"
        response = self.session.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        jobs = soup.find_all('div', class_='job_seen_beacon')
        for job in jobs:
            title = job.find('h2', class_='jobTitle').text.strip()
            company = job.find('span', class_='companyName').text.strip()
            salary = job.find('div', class_='salaryInfo')
            salary = salary.text.strip() if salary else 'Not specified'
            
            self.results.append({
                'title': title,
                'company': company,
                'salary': salary,
                'source': 'indeed.com',
                'scraped_at': datetime.now().isoformat()
            })
        return len(jobs)
    
    def scrape_linkedin(self, query):
        """Scrape job listings from LinkedIn"""
        url = f"https://www.linkedin.com/jobs/search?keywords={query}"
        response = self.session.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        cards = soup.find_all('div', class_='base-card')
        for card in cards:
            title = card.find('h3', class_='base-search-card__title')
            company = card.find('h4', class_='base-search-card__subtitle')
            # ... extract and store data
        return len(cards)`,
    
    flask: `# app.py - Flask web application
from flask import Flask, render_template, jsonify, request
from scraper import JobScraper
from models import Job, db
import schedule
import threading

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jobs.db'
db.init_app(app)

# Background scraper thread
def run_scheduled_scrape():
    scraper = JobScraper()
    while True:
        schedule.run_pending()
        time.sleep(60)

@app.route('/')
def index():
    """Main dashboard page"""
    jobs = Job.query.order_by(
        Job.scraped_at.desc()
    ).limit(50).all()
    return render_template('index.html', jobs=jobs)

@app.route('/api/jobs')
def api_jobs():
    """API endpoint for job listings"""
    source = request.args.get('source', '')
    query = request.args.get('q', '')
    
    jobs = Job.query
    if source:
        jobs = jobs.filter_by(source=source)
    if query:
        jobs = jobs.filter(
            Job.title.ilike(f'%{query}%')
        )
    
    return jsonify([job.to_dict() for job in jobs.all()])

@app.route('/api/scrape', methods=['POST'])
def trigger_scrape():
    """Manually trigger a scrape"""
    scraper = JobScraper()
    results = scraper.run_all()
    return jsonify({
        'status': 'success',
        'jobs_scraped': len(results)
    })

if __name__ == '__main__':
    # Start background scraper
    thread = threading.Thread(target=run_scheduled_scrape)
    thread.daemon = True
    thread.start()
    
    app.run(debug=True, port=5000)`,
    
    parser: `# parser.py - BeautifulSoup parsing utilities
from bs4 import BeautifulSoup
import re
from typing import List, Dict, Optional

class JobParser:
    """Parse and clean job listing data"""
    
    @staticmethod
    def parse_salary(text: str) -> Dict[str, any]:
        """Extract salary range from text"""
        numbers = re.findall(r'\\$[\\d,]+', text)
        if len(numbers) >= 2:
            return {
                'min': int(numbers[0].replace('$','').replace(',','')),
                'max': int(numbers[1].replace('$','').replace(',','')),
                'raw': text.strip()
            }
        elif len(numbers) == 1:
            val = int(numbers[0].replace('$','').replace(',',''))
            return {'min': val, 'max': val, 'raw': text.strip()}
        return {'min': 0, 'max': 0, 'raw': 'Not specified'}
    
    @staticmethod
    def extract_tags(soup: BeautifulSoup) -> List[str]:
        """Extract skill tags from job posting"""
        tags = []
        tag_elements = soup.find_all('span', class_='tag')
        for tag in tag_elements:
            text = tag.get_text(strip=True)
            if text and len(text) < 30:
                tags.append(text)
        return tags[:10]  # Limit to 10 tags
    
    @staticmethod
    def clean_html(html_content: str) -> str:
        """Remove unwanted HTML elements"""
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Remove scripts and styles
        for element in soup.find_all(['script', 'style', 'nav']):
            element.decompose()
        
        # Remove ads and tracking pixels
        for element in soup.find_all(class_=re.compile(r'ad|track|pixel')):
            element.decompose()
        
        return str(soup)
    
    @staticmethod
    def parse_location(text: str) -> Dict[str, str]:
        """Parse location into components"""
        remote = bool(re.search(r'remote|work from home', text, re.I))
        parts = [p.strip() for p in text.split(',')]
        return {
            'city': parts[0] if parts else '',
            'state': parts[1] if len(parts) > 1 else '',
            'remote': remote,
            'raw': text.strip()
        }`
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-700">
      <div className="flex items-center border-b border-gray-700">
        <button
          onClick={() => setActiveTab('scraper')}
          className={`px-4 py-3 text-xs font-medium transition-colors ${
            activeTab === 'scraper' 
              ? 'text-green-400 border-b-2 border-green-400 bg-gray-800' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          🕷️ scraper.py
        </button>
        <button
          onClick={() => setActiveTab('flask')}
          className={`px-4 py-3 text-xs font-medium transition-colors ${
            activeTab === 'flask' 
              ? 'text-green-400 border-b-2 border-green-400 bg-gray-800' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          🌐 app.py (Flask)
        </button>
        <button
          onClick={() => setActiveTab('parser')}
          className={`px-4 py-3 text-xs font-medium transition-colors ${
            activeTab === 'parser' 
              ? 'text-green-400 border-b-2 border-green-400 bg-gray-800' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          🔍 parser.py
        </button>
      </div>
      <div className="p-4 overflow-auto max-h-96 custom-scrollbar">
        <pre className="text-xs font-mono text-gray-300 whitespace-pre leading-relaxed">
          {codeSnippets[activeTab]}
        </pre>
      </div>
    </div>
  );
};

export default CodePreview;
