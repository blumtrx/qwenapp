"""
Flask web application for JobScraper
Serves the dashboard and provides API endpoints for job data
"""
from flask import Flask, render_template, jsonify, request
from scraper import JobScraper
from datetime import datetime

app = Flask(__name__)

# Initialize scraper
scraper = JobScraper()

@app.route('/')
def index():
    """Main dashboard page"""
    return render_template('index.html')

@app.route('/api/jobs')
def get_jobs():
    """API endpoint to get all scraped jobs"""
    source = request.args.get('source', '')
    query = request.args.get('q', '')
    
    jobs = scraper.get_jobs()
    
    # Apply filters
    if source:
        jobs = [job for job in jobs if job.get('source') == source]
    if query:
        query_lower = query.lower()
        jobs = [job for job in jobs if 
                query_lower in job.get('title', '').lower() or
                query_lower in job.get('company', '').lower() or
                query_lower in job.get('description', '').lower()]
    
    return jsonify({
        'status': 'success',
        'count': len(jobs),
        'jobs': jobs
    })

@app.route('/api/scrape', methods=['POST'])
def trigger_scrape():
    """Manually trigger a scraping job"""
    try:
        results = scraper.run_all()
        return jsonify({
            'status': 'success',
            'message': f'Scraped {len(results)} jobs',
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/sources')
def get_sources():
    """Get list of configured scraping sources"""
    sources = scraper.get_sources()
    return jsonify({
        'status': 'success',
        'sources': sources
    })

if __name__ == '__main__':
    print("🕷️  JobScraper starting...")
    print("📊 Dashboard: http://127.0.0.1:5000")
    print("🔌 API: http://127.0.0.1:5000/api/jobs")
    app.run(debug=True, host='0.0.0.0', port=5000)
