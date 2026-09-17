# Job Application Tracker

A full-stack web application for managing and tracking job applications in one place.

## Features

* User registration and login
* JWT-based authentication
* Protected dashboard
* Create job applications
* View applications
* Edit applications
* Delete applications
* Search applications
* Filter applications by status
* Dashboard statistics
* Form validation
* MongoDB data storage
* Responsive interface

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* React Router
* CSS

### Backend

* Node.js
* Express.js
* Mongoose
* JWT
* bcryptjs
* express-validator

### Database

* MongoDB Atlas

### Development Tools

* Git
* GitHub
* Postman
* VS Code

## Application Statuses

Applications can have one of the following statuses:

* Applied
* Interview
* Rejected
* Offer

## Project Structure

```text
job-application-tracker/
├── client/
│   └── React frontend
│
├── server/
│   └── Node.js + Express backend
│
├── .github/
│   └── GitHub Actions
│
├── .gitignore
└── README.md
```

## API Endpoints

### Authentication

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| POST   | `/api/auth/register` | Register a user  |
| POST   | `/api/auth/login`    | Login            |
| GET    | `/api/auth/me`       | Get current user |

### Applications

| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| GET    | `/api/applications`     | Get user's applications |
| POST   | `/api/applications`     | Create application      |
| PUT    | `/api/applications/:id` | Update application      |
| DELETE | `/api/applications/:id` | Delete application      |

## Environment Variables

### Server

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Client

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Do not commit `.env` files to GitHub.

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd job-application-tracker
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

The backend will normally run on:

```text
http://localhost:5000
```

## Authentication

The application uses JWT authentication.

Passwords are hashed using bcrypt before being stored in MongoDB.

Protected API requests require a valid JWT:

```text
Authorization: Bearer <token>
```

## Author

Yumeth Nethdula

Computer Science / Software Engineering

Sri Lanka
