const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database - In production, use a real database
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'admin'
  }
];

const customers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0123',
    address: '123 Main St, New York, NY 10001',
    company: 'Tech Solutions Inc.',
    status: 'Active',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-20'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1-555-0456',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    company: 'Creative Agency LLC',
    status: 'Active',
    joinDate: '2023-03-22',
    lastLogin: '2024-01-19'
  }
];

// Email transporter configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all customers
app.get('/api/customers', authenticateToken, (req, res) => {
  res.json(customers);
});

// Get single customer
app.get('/api/customers/:id', authenticateToken, (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }
  res.json(customer);
});

// Update customer
app.put('/api/customers/:id', authenticateToken, (req, res) => {
  const customerId = parseInt(req.params.id);
  const customerIndex = customers.findIndex(c => c.id === customerId);
  
  if (customerIndex === -1) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  // Update customer data
  customers[customerIndex] = {
    ...customers[customerIndex],
    ...req.body,
    id: customerId // Ensure ID doesn't change
  };

  res.json({
    message: 'Customer updated successfully',
    customer: customers[customerIndex]
  });
});

// Send email to customer
app.post('/api/customers/:id/send-email', authenticateToken, async (req, res) => {
  try {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: 'Customer Information Update',
      html: `
        <h2>Dear ${customer.name},</h2>
        <p>Here are your current details in our system:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${customer.name}</p>
          <p><strong>Email:</strong> ${customer.email}</p>
          <p><strong>Phone:</strong> ${customer.phone}</p>
          <p><strong>Address:</strong> ${customer.address}</p>
          <p><strong>Company:</strong> ${customer.company}</p>
          <p><strong>Status:</strong> ${customer.status}</p>
          <p><strong>Join Date:</strong> ${customer.joinDate}</p>
        </div>
        <p>If you have any questions or need to update your information, please contact us.</p>
        <p>Best regards,<br>Customer Service Team</p>
      `
    };

    // In development, we'll simulate sending email
    console.log('Email would be sent to:', customer.email);
    console.log('Email content:', mailOptions.html);

    // Uncomment the following line to actually send emails (requires valid email configuration)
    // await transporter.sendMail(mailOptions);

    res.json({ message: 'Email sent successfully to ' + customer.email });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});