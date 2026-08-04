StockPilot Inventory Management System
End-to-End DevOps & GitOps Project on AWS EKS

A production-style inventory management application deployed on Amazon EKS with a complete CI/CD and GitOps pipeline using Jenkins, Argo CD, Docker, Kubernetes, AWS ALB Ingress, Prometheus, and Grafana.

Project Overview

This project demonstrates a complete DevOps lifecycle from source code commit to production deployment on Amazon EKS.

The application is automatically built, scanned, containerized, deployed, and monitored using modern DevOps tools and GitOps practices.

Architecture:

<img width="1600" height="1180" alt="image" src="https://github.com/user-attachments/assets/5addeb48-0325-4f29-ad69-7a425472a914" />

Tech Stack
 Category | Technology |
|----------|------------|
| ☁️ Cloud | AWS |
| 🐳 Containerization | Docker |
| ☸️ Container Orchestration | Kubernetes (Amazon EKS) |
| 🏗️ Infrastructure as Code | Terraform |
| 🔄 CI | Jenkins | 
| 🚀 GitOps | Argo CD |
| 📦 Container Registry | Docker Hub |
| 🔍 Code Quality | SonarQube |
| 🛡️ Security Scanning | Trivy |
| 📊 Monitoring | Prometheus |
| 📈 Visualization | Grafana |
| 🗄️ Database | MongoDB |
| 🌐 Load Balancer | AWS Application Load Balancer (ALB) |
| 🔀 Networking | Kubernetes Ingress |

## 🔄 CI/CD Pipeline

The Jenkins pipeline performs the following stages:

- Checkout Source Code
- Install Dependencies
- SonarQube Code Analysis
- Build Docker Image
- Trivy Vulnerability Scan
- Push Docker Image to Docker Hub
- Update Kubernetes Manifests
- Push Changes to GitHub
- Argo CD Detects Changes
- Automatic Deployment to Amazon EKS

<img width="1600" height="1180" alt="devops_gitops_architecture" src="https://github.com/user-attachments/assets/6a8a733f-ebae-4a51-b92b-1b8b325cf071" />


Argo CD continuously watches the Kubernetes manifests stored in GitHub.

Whenever Jenkins updates the deployment manifests:

Argo CD detects the Git commit
Synchronizes the desired state
Deploys the latest application to Amazon EKS
Performs automatic reconciliation (Self-Healing)
Kubernetes Architecture

The application is deployed on Amazon EKS using:

Frontend Deployment
Backend Deployment
MongoDB Deployment
ClusterIP Services
Kubernetes Ingress
AWS Load Balancer Controller
AWS Application Load Balancer (ALB)

Instead of exposing multiple LoadBalancers, a single AWS ALB routes traffic using Kubernetes Ingress.

Monitoring

The Kubernetes cluster is monitored using:

Prometheus
Node Exporter
kube-state-metrics

Features
End-to-End CI/CD Pipeline
GitOps Deployment
Kubernetes on Amazon EKS
AWS ALB Ingress
Dockerized Application
Automated Security Scanning
Automated Code Quality Checks
Infrastructure as Code
Centralized Monitoring
Production-style Deployment
