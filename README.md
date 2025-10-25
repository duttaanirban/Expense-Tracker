# Expense Tracker

A full-stack Expense Tracker application built with React (Vite) for the frontend and Node.js/Express with MongoDB for the backend. Easily manage your income and expenses, visualize your financial data, and track transactions with beautiful charts and dashboards.

## Features
- User authentication (login/signup)
- Add, view, and delete income and expense entries
- Dashboard with financial overview
- Pie and bar charts for income and expenses
- Download income/expense data
- Profile picture and emoji picker for entries
- Responsive, modern UI

## Technologies Used
- **Frontend:** React, Vite, Tailwind CSS, Recharts
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Other:** JWT Auth, Moment.js, React Icons

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/duttaanirban/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. **Backend setup:**
   ```bash
   cd backend
   npm install
   # Create a .env file (see below)
   npm start
   ```

3. **Frontend setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

### Environment Variables
Create a `.env` file in the `backend` folder with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
ALLOWED_ORIGIN=your_frontend_url
```

## Usage
- Register and log in
- Add income and expense entries
- View dashboard with charts and recent transactions
- Download your data as Excel

## Folder Structure
```
Expense-Tracker/
  backend/
    controllers/
    models/
    routes/
    ...
  frontend/
    src/
      components/
      pages/
      utils/
      ...
```

Made with ❤️ by duttaanirban
