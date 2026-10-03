# JobScraper - Flask + BeautifulSoup Job News Scraper

A web application that scrapes job listings from multiple job boards using **Python Flask** and **BeautifulSoup**, then displays the data in a beautiful dashboard.

![JobScraper Dashboard](https://img.shields.io/badge/Python-3.11+-blue) ![Flask](https://img.shields.io/badge/Flask-3.0-green) ![BeautifulSoup](https://img.shields.io/badge/BeautifulSoup-4-orange)

## 🚀 Features

- **Multi-source scraping** — Scrapes jobs from Indeed, LinkedIn, Glassdoor, Stack Overflow, and Upwork
- **Real-time terminal logs** — Watch the scraper execute in real-time with colored log output
- **Interactive dashboard** — Filter jobs by source, type, and search keywords
- **Source code viewer** — Browse the actual Python/Flask/BeautifulSoup code that powers the scraper
- **Responsive design** — Works on desktop and mobile devices

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.11, Flask 3.0 |
| Scraping | BeautifulSoup4, Requests, Selenium |
| Database | SQLite |
| Frontend | React, TypeScript, Tailwind CSS, Vite |
| Scheduling | APScheduler |

## 📦 Installation

### Backend (Flask + BeautifulSoup)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/jobscraper.git
cd jobscraper/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```

### Frontend (React Dashboard)

```bash
cd jobscraper/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
jobscraper/
├── backend/
│   ├── app.py              # Flask web application
│   ├── scraper.py          # Main scraper module
│   ├── parser.py           # BeautifulSoup parsing utilities
│   ├── models.py           # Database models
│   ├── config.yaml         # Scraper configuration
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.tsx         # Main application component
│   │   ├── components/     # React components
│   │   └── data/           # Mock data & types
│   ├── index.html
│   └── package.json
└── README.md
```

## 🕷️ Scraper Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Scheduler   │────▶│   Scraper    │────▶│  Parser     │
│  (APScheduler)│     │  (Requests)  │     │ (BeautifulSoup)│
└─────────────┘     └──────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │   SQLite DB  │
                                        └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Flask API   │
                                        │  (REST)      │
                                        └─────────────┘
```

## 🔧 Configuration

Edit `backend/config.yaml` to customize:

```yaml
scraper:
  sources:
    - name: indeed
      url: https://www.indeed.com/jobs?q={query}
      selectors:
        title: "h2.jobTitle"
        company: "span.companyName"
        salary: "div.salaryInfo"
    - name: linkedin
      url: https://www.linkedin.com/jobs/search?keywords={query}
      selectors:
        title: "h3.base-search-card__title"
        company: "h4.base-search-card__subtitle"
  
  schedule:
    interval_minutes: 60
    max_retries: 3
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Dashboard page |
| GET | `/api/jobs` | Get all scraped jobs |
| GET | `/api/jobs?source=indeed&q=python` | Filter jobs |
| POST | `/api/scrape` | Trigger manual scrape |
| GET | `/api/sources` | List configured sources |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

This tool is for educational purposes. Always check a website's `robots.txt` and Terms of Service before scraping. Respect rate limits and don't overload servers.
