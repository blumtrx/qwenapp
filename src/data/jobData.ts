export interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  source: string;
  tags: string[];
  url: string;
}

export const jobListings: JobListing[] = [
  {
    id: 1,
    title: "Senior Python Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$130,000 - $170,000",
    type: "Full-time",
    posted: "2 hours ago",
    description: "We are looking for an experienced Python developer with Flask/FastAPI expertise to join our backend team. You will work on building scalable APIs and microservices.",
    source: "indeed.com",
    tags: ["Python", "Flask", "AWS", "Docker"],
    url: "https://indeed.com/job/1"
  },
  {
    id: 2,
    title: "Full Stack Web Developer",
    company: "InnovateTech Inc.",
    location: "New York, NY (Remote)",
    salary: "$110,000 - $145,000",
    type: "Full-time",
    posted: "5 hours ago",
    description: "Join our dynamic team building modern web applications using React, Node.js, and Python. Experience with web scraping and data processing is a plus.",
    source: "linkedin.com",
    tags: ["React", "Node.js", "Python", "PostgreSQL"],
    url: "https://linkedin.com/job/2"
  },
  {
    id: 3,
    title: "Data Engineer - Web Scraping Specialist",
    company: "DataFlow Analytics",
    location: "Austin, TX",
    salary: "$120,000 - $155,000",
    type: "Full-time",
    posted: "1 day ago",
    description: "Seeking a data engineer with strong BeautifulSoup and Selenium experience to build and maintain web scraping pipelines for our analytics platform.",
    source: "glassdoor.com",
    tags: ["Python", "BeautifulSoup", "Selenium", "ETL"],
    url: "https://glassdoor.com/job/3"
  },
  {
    id: 4,
    title: "Backend Developer (Flask/Django)",
    company: "CloudNine Systems",
    location: "Seattle, WA",
    salary: "$125,000 - $160,000",
    type: "Full-time",
    posted: "1 day ago",
    description: "We need a skilled backend developer to architect and build RESTful APIs using Flask and Django. Experience with PostgreSQL and Redis required.",
    source: "indeed.com",
    tags: ["Flask", "Django", "PostgreSQL", "Redis"],
    url: "https://indeed.com/job/4"
  },
  {
    id: 5,
    title: "Junior Web Developer",
    company: "StartupHub",
    location: "Denver, CO (Hybrid)",
    salary: "$65,000 - $85,000",
    type: "Full-time",
    posted: "2 days ago",
    description: "Great opportunity for a junior developer to learn and grow. You'll work with Python, Flask, and modern frontend technologies on real-world projects.",
    source: "stackoverflow.com",
    tags: ["Python", "JavaScript", "HTML/CSS", "Git"],
    url: "https://stackoverflow.com/job/5"
  },
  {
    id: 6,
    title: "DevOps Engineer - Python Automation",
    company: "MegaScale Corp",
    location: "Chicago, IL",
    salary: "$140,000 - $175,000",
    type: "Full-time",
    posted: "2 days ago",
    description: "Looking for a DevOps engineer to automate our deployment pipelines. Python scripting, web scraping for monitoring, and CI/CD experience required.",
    source: "linkedin.com",
    tags: ["Python", "Docker", "Kubernetes", "CI/CD"],
    url: "https://linkedin.com/job/6"
  },
  {
    id: 7,
    title: "Web Scraping Consultant",
    company: "ScrapeMaster Pro",
    location: "Remote (US)",
    salary: "$90,000 - $130,000",
    type: "Contract",
    posted: "3 days ago",
    description: "We need a web scraping consultant to help clients extract data from various websites. Must be proficient in BeautifulSoup, Scrapy, and handling anti-bot measures.",
    source: "upwork.com",
    tags: ["BeautifulSoup", "Scrapy", "Python", "APIs"],
    url: "https://upwork.com/job/7"
  },
  {
    id: 8,
    title: "Machine Learning Engineer",
    company: "AI Dynamics",
    location: "Boston, MA",
    salary: "$150,000 - $200,000",
    type: "Full-time",
    posted: "3 days ago",
    description: "Join our ML team to build intelligent data extraction systems. Experience with NLP, web scraping, and Python required. PhD preferred.",
    source: "glassdoor.com",
    tags: ["Python", "TensorFlow", "NLP", "Data Mining"],
    url: "https://glassdoor.com/job/8"
  },
  {
    id: 9,
    title: "Software Engineer - Data Platform",
    company: "DataStream Inc.",
    location: "Portland, OR (Remote)",
    salary: "$115,000 - $150,000",
    type: "Full-time",
    posted: "4 days ago",
    description: "Build and maintain our data platform that ingests data from multiple web sources. Flask API development and web scraping experience preferred.",
    source: "indeed.com",
    tags: ["Python", "Flask", "MongoDB", "Web Scraping"],
    url: "https://indeed.com/job/9"
  },
  {
    id: 10,
    title: "QA Automation Engineer",
    company: "QualityFirst Labs",
    location: "Miami, FL",
    salary: "$95,000 - $125,000",
    type: "Full-time",
    posted: "4 days ago",
    description: "Automate testing workflows using Python and Selenium/BeautifulSoup. Experience with web scraping tools and test automation frameworks required.",
    source: "stackoverflow.com",
    tags: ["Python", "Selenium", "BeautifulSoup", "Testing"],
    url: "https://stackoverflow.com/job/10"
  },
  {
    id: 11,
    title: "Python Developer - E-Commerce",
    company: "ShopTech Solutions",
    location: "Los Angeles, CA",
    salary: "$105,000 - $140,000",
    type: "Full-time",
    posted: "5 days ago",
    description: "Develop price monitoring and product scraping tools for our e-commerce platform. Flask backend with BeautifulSoup for data extraction.",
    source: "linkedin.com",
    tags: ["Python", "Flask", "BeautifulSoup", "E-Commerce"],
    url: "https://linkedin.com/job/11"
  },
  {
    id: 12,
    title: "Technical Writer - Developer Tools",
    company: "DevDocs Media",
    location: "Remote (Worldwide)",
    salary: "$75,000 - $100,000",
    type: "Part-time",
    posted: "5 days ago",
    description: "Write technical documentation for web scraping tools and APIs. Must understand Python, Flask, BeautifulSoup, and be able to explain complex concepts simply.",
    source: "upwork.com",
    tags: ["Technical Writing", "Python", "APIs", "Documentation"],
    url: "https://upwork.com/job/12"
  }
];

export const scraperSources = [
  { name: "Indeed", url: "https://www.indeed.com", status: "completed", jobs: 4, time: "2.3s" },
  { name: "LinkedIn", url: "https://www.linkedin.com/jobs", status: "completed", jobs: 3, time: "3.1s" },
  { name: "Glassdoor", url: "https://www.glassdoor.com", status: "completed", jobs: 2, time: "1.8s" },
  { name: "Stack Overflow", url: "https://stackoverflow.com/jobs", status: "completed", jobs: 2, time: "1.2s" },
  { name: "Upwork", url: "https://www.upwork.com", status: "completed", jobs: 1, time: "0.9s" },
];

export const scraperLogs = [
  { time: "10:23:01", level: "INFO", message: "Starting job scraper v2.1.0..." },
  { time: "10:23:01", level: "INFO", message: "Loading configuration from config.yaml" },
  { time: "10:23:02", level: "INFO", message: "Initializing BeautifulSoup parser (html.parser)" },
  { time: "10:23:02", level: "INFO", message: "Connecting to Indeed.com..." },
  { time: "10:23:04", level: "SUCCESS", message: "✓ Scraped 4 jobs from Indeed.com (2.3s)" },
  { time: "10:23:04", level: "INFO", message: "Connecting to LinkedIn.com/jobs..." },
  { time: "10:23:07", level: "SUCCESS", message: "✓ Scraped 3 jobs from LinkedIn.com (3.1s)" },
  { time: "10:23:07", level: "INFO", message: "Connecting to Glassdoor.com..." },
  { time: "10:23:09", level: "SUCCESS", message: "✓ Scraped 2 jobs from Glassdoor.com (1.8s)" },
  { time: "10:23:09", level: "INFO", message: "Connecting to StackOverflow.com/jobs..." },
  { time: "10:23:10", level: "SUCCESS", message: "✓ Scraped 2 jobs from StackOverflow.com (1.2s)" },
  { time: "10:23:10", level: "INFO", message: "Connecting to Upwork.com..." },
  { time: "10:23:11", level: "SUCCESS", message: "✓ Scraped 1 job from Upwork.com (0.9s)" },
  { time: "10:23:11", level: "INFO", message: "Parsing HTML with BeautifulSoup..." },
  { time: "10:23:11", level: "INFO", message: "Extracting job titles: soup.find_all('h2', class_='title')" },
  { time: "10:23:12", level: "INFO", message: "Extracting company names: soup.find_all('span', class_='company')" },
  { time: "10:23:12", level: "INFO", message: "Extracting salary info: soup.find_all('div', class_='salary')" },
  { time: "10:23:12", level: "INFO", message: "Cleaning and normalizing data..." },
  { time: "10:23:13", level: "SUCCESS", message: "✓ Total: 12 jobs scraped successfully from 5 sources" },
  { time: "10:23:13", level: "INFO", message: "Data saved to database (SQLite)" },
  { time: "10:23:13", level: "INFO", message: "Scraper completed in 12.3 seconds" },
];
