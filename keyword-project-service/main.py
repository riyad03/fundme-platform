from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

api=FastAPI()

class Query(BaseModel):
    query:str

tfidf= TfidfVectorizer()
corpus = [
        """AI‑Powered Video Recommendation Engine
    Goal: Improve user engagement by delivering personalized video suggestions.
    Tech Stack: Python, TensorFlow, Scikit‑Learn, Kafka, Docker, PostgreSQL.
    Overview: Ingested user watch‑history and metadata streams via Kafka, trained a hybrid collaborative‑+‑content‑based model in TensorFlow, containerized the inference microservice with Docker, and exposed recommendations over a REST API.
    Outcomes: Achieved a 22% lift in click‑through rate in A/B tests; system scales to 50k requests/min under load.""",

        """FundMe Crowdfunding Platform (Microservices Architecture)
    Goal: Build a scalable web app for fundraising campaigns.
    Tech Stack: Java, Spring Boot, Spring Cloud Gateway, Eureka, MySQL, RabbitMQ, React, Tailwind CSS.
    Overview: Decomposed into user, campaign, payment, and notification services. Used Eureka for discovery, API Gateway for routing, and RabbitMQ for async events. Frontend in React with reusable components and responsive design.
    Outcomes: Supported 1,000 concurrent campaigns; average page load time under 300 ms; implemented CI/CD with GitHub Actions.""",

        """Real‑Time Drone Threat Detection System
    Goal: Detect and classify aerial threats using onboard cameras.
    Tech Stack: C++, OpenCV, TensorRT, ROS, NVIDIA Jetson, MQTT.
    Overview: Captured video streams on a Jetson Nano, ran optimized YOLOv4 inference via TensorRT, published threat alerts via MQTT to a ground‑station dashboard. ROS nodes handled sensor fusion and path‑planning overrides.
    Outcomes: Detected targets at 30 fps with 87% accuracy; end‑to‑end latency under 50 ms; deployed in field trials.""",

        """Supply Chain Demand Forecasting Platform
    Goal: Optimize agricultural inventory and routing.
    Tech Stack: Python, Pandas, Prophet, AWS Lambda, DynamoDB, API Gateway, S3.
    Overview: Collected historical shipment and price data in S3, ran daily forecast jobs via Lambda+Prophet to predict demand per region, stored forecasts in DynamoDB, and exposed dashboards through a serverless web app.
    Outcomes: Reduced stockouts by 35%, cut per‑route mileage by 18%, and saved ~$45k/month in logistics costs.""",

        """TF‑IDF + SBERT Resume Keyword Matching API
    Goal: Enable fuzzy search of resumes against job descriptions.
    Tech Stack: Python, Scikit‑Learn, Sentence‑Transformers, FastAPI, Redis.
    Overview: First pass TF‑IDF vectorizer filters candidates, then SBERT encodes resumes + JDs for semantic similarity. Built a FastAPI endpoint; results cached in Redis for sub‑200 ms lookup.
    Outcomes: Improved match precision from 68% to 91%; handles 10k queries/day; easy “plug‑in” architecture for future models.""",

        """Real‑Time DOM‑Mutation Chrome Extension
    Goal: Monitor and manipulate web‑page elements live for automated testing.
    Tech Stack: JavaScript, Chrome Extensions API, MutationObserver, WebSockets, Node.js.
    Overview: Injects a content script that uses MutationObserver to detect target elements, relays changes to a Node.js backend over WebSockets, and applies user‑defined DOM patches on the fly.
    Outcomes: Enables live‑editing of DOM in tests; reduced manual QA time by 40%.""",

        """CI/CD‑Driven Kubernetes Deployment Pipeline
    Goal: Automate build, test, and deployment of microservices.
    Tech Stack: GitLab CI, Docker, Helm, Kubernetes (EKS), Terraform, Prometheus, Grafana.
    Overview: Defined GitLab pipelines with build/test stages, pushed images to ECR, used Helm charts for staging/production, and managed infra via Terraform. Integrated Prometheus/Grafana for observability.
    Outcomes: Cut deployment time from hours to <10 minutes; zero‑downtime rollouts; in‑depth metric dashboards enabled 24/7 monitoring.""",

        """SIEM‑Style Network Anomaly Detection
    Goal: Identify suspicious patterns in network flows.
    Tech Stack: Python, Scapy, Kafka, Elastic Stack, Isolation Forest (Scikit‑Learn).
    Overview: Parsed live NetFlow data with Scapy, pushed events to Kafka, indexed with Elasticsearch, and ran an Isolation Forest job for anomaly scoring. Kibana dashboards visualized alerts and trends.
    Outcomes: Flagged novel attack vectors pre‑deployment; reduced false positives by 30%; integrated with Slack alerts.""",

        """Data Warehouse ETL & Analytics Dashboard
    Goal: Centralize disparate data sources for business intelligence.
    Tech Stack: SQL Server, SSIS, SSAS, Power BI, Python (pandas).
    Overview: Built SSIS packages to extract/transform/load from ERP and CRM systems into a 3NF staging EDW, created dimensional data‑marts in SSAS, and developed interactive Power BI reports for sales and finance teams.
    Outcomes: Unified reporting cut manual preparation time by 75%; enabled drill‑down analytics that drove a 12% uplift in quarterly revenue.""",

        """Interactive React‑Tailwind UI Library
    Goal: Provide a reusable component set for internal apps.
    Tech Stack: React, TypeScript, Tailwind CSS, Storybook, Jest.
    Overview: Developed buttons, inputs, cards, and modals with consistent theme tokens. Published to a private npm registry, documented in Storybook, and covered components with unit tests in Jest.
    Outcomes: Accelerated front‑end development by 50%; ensured UI consistency across five projects; reduced CSS bundle size by 20%."""
]

result=tfidf.fit_transform(corpus)
@api.get("/test")
def test():
    return "Hello World"

@api.post("/analyze")
def analyze(data:Query):
    print(data.query)
    
    query=tfidf.transform([data.query])

    sims=cosine_similarity(query,result)
    
    print(sims)
    top3=sims.argsort()[::-1][:,:3].reshape(-1)
    

    print(corpus[top3[0]],"#################")
    print(corpus[top3[1]],"#################")
    print(corpus[top3[2]],"#################")
  
    return {
        "message":"Recieved",
        "query":data.query
    }
