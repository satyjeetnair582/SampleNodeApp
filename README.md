# React + Node.js Customer Management Application

A full-stack web application demonstrating React frontend integration with Node.js backend, featuring user authentication, customer management, and email functionality.

## Features

### Frontend (React)
- **Authentication**: Login system with JWT token management
- **Protected Routes**: Route protection using React Router
- **Customer Dashboard**: Interactive customer management interface
- **Real-time Updates**: Live customer data editing and updates
- **Responsive Design**: Mobile-friendly UI with modern styling
- **Context API**: Global state management for authentication

### Backend (Node.js)
- **RESTful API**: Express.js server with structured endpoints
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Email Integration**: Nodemailer for sending customer emails
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Comprehensive error handling and validation

## Technology Stack

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- CSS3 with modern styling
- Vite for development and building

### Backend
- Node.js with Express.js
- JWT for authentication
- bcryptjs for password hashing
- Nodemailer for email functionality
- CORS middleware
- dotenv for environment variables

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── CustomerCard.jsx
│   │   ├── context/        # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
├── server/                 # Node.js backend
│   └── index.js
├── .env                    # Environment variables
└── package.json           # Root package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   cd client && npm install
   ```

2. **Configure environment variables**:
   Update the `.env` file with your settings:
   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password_here
   ```

3. **Start the application**:
   ```bash
   npm run dev
   ```
   This will start both the backend server (port 5000) and frontend development server (port 3000).

### Demo Credentials
- **Username**: admin
- **Password**: password

## API Endpoints

### Authentication
- `POST /api/login` - User login

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get single customer
- `PUT /api/customers/:id` - Update customer
- `POST /api/customers/:id/send-email` - Send email to customer

### Health Check
- `GET /api/health` - Server health check

## Key Features Explained

### 1. Authentication Flow
- User logs in with credentials
- Server validates and returns JWT token
- Token stored in localStorage and sent with API requests
- Protected routes redirect to login if no valid token

### 2. Customer Management
- View customer list in sidebar
- Select customer to view/edit details
- Real-time form validation and updates
- Success/error message feedback

### 3. Email Functionality
- Send formatted emails to customers
- Email templates with customer details
- Error handling for email failures
- Visual feedback for email status

### 4. React-Node Integration
- Axios interceptors for automatic token handling
- Proxy configuration for development
- CORS setup for cross-origin requests
- Centralized API service layer

## Development Notes

### Frontend Architecture
- **Context API**: Manages authentication state globally
- **Protected Routes**: HOC pattern for route protection
- **Service Layer**: Centralized API calls with interceptors
- **Component Structure**: Modular, reusable components

### Backend Architecture
- **Middleware**: Authentication, CORS, JSON parsing
- **Mock Database**: In-memory data for demonstration
- **Error Handling**: Consistent error responses
- **Security**: JWT tokens, password hashing, input validation

### Styling Approach
- **CSS Modules**: Component-scoped styling
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Gradients, shadows, animations
- **Accessibility**: Focus states, semantic HTML

## Production Considerations

For production deployment, consider:

1. **Database**: Replace mock data with real database (MongoDB, PostgreSQL)
2. **Environment**: Use production-grade environment variables
3. **Security**: Add rate limiting, input sanitization, HTTPS
4. **Email**: Configure production email service
5. **Build**: Optimize builds and enable compression
6. **Monitoring**: Add logging and error tracking

## Learning Objectives

This application demonstrates:
- Full-stack JavaScript development
- React frontend with modern hooks and context
- Node.js backend with Express.js
- JWT authentication implementation
- API design and integration
- State management in React
- Responsive web design
- Error handling and user feedback

## Scripts

- `npm run dev` - Start both frontend and backend in development
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend development server
- `npm run build` - Build the frontend for production