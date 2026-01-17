# HRMS Lite - Full Stack Assignment

A lightweight Human Resource Management System designed to manage employee records and track daily attendance. Built with **Django Rest Framework** (Backend) and **React + Tailwind CSS** (Frontend).

## Live Demo
* **Frontend (UI):** https://magnificent-lokum-0ce703.netlify.app/
* **Backend (API):** https://hrms-k8f1.onrender.com/api/employees/
* **GitHub Repository:** https://github.com/x1ph3rr/hrms

---

## Tech Stack

### Frontend
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios
* **Hosting:** Netlify

### Backend
* **Framework:** Django + Django Rest Framework (DRF)
* **Database:** SQLite (SQL compliant)
* **Hosting:** Render (Python Web Service)

---

## Assumptions & Limitations

### 1. Database Choice: SQLite
* **Why SQLite?** To strictly adhere to the tight time constraint and prioritize a stable, bug-free implementation, I opted for **SQLite**. It satisfies the assignment's requirement for a SQL database.
* **Production Note:** For a large-scale real-world app, I would swap the `DATABASES` setting to PostgreSQL.
* **Deployment Limitation:** On the **Render Free Tier**, the file system is ephemeral. This means **database data may reset** if the server restarts or re-deploys. This is a known limitation of using SQLite on free cloud hosting, not a bug in the application logic.

### 2. Authentication
* As per the assignment guidelines ("Assume a single admin user"), the system is open access for simplicity. No complex login/auth system was implemented for the frontend.

---

## Installation & Local Setup

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/x1ph3rr/hrms
cd hrms-python
```

### 2. Backend Setup
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run Migrations
python manage.py migrate

# Start Server
python manage.py runserver

### 3. Frontend Setup
cd client

# Install dependencies
npm install

# Start Development Server
npm run dev