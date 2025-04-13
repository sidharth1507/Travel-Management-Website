const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up SQLite database
const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  // Create users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    dob TEXT,
    gender TEXT,
    country TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  // Create bookings table
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    location_from TEXT,
    location_to TEXT,
    guests INTEGER,
    arrivals TEXT,
    departures TEXT,
    transport_type TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  console.log('Database tables initialized');
}

// JWT Secret
const JWT_SECRET = 'manzil_travel_secret_key';

// Routes

// Register a new user
app.post('/api/register', async (req, res) => {
  const { name, phone, email, password, dob, gender, country, city, state, pincode } = req.body;

  try {
    // Check if user already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new user
      const sql = `INSERT INTO users (name, phone, email, password, dob, gender, country, city, state, pincode) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
      db.run(sql, [name, phone, email, hashedPassword, dob, gender, country, city, state, pincode], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Generate JWT token
        const token = jwt.sign({ id: this.lastID }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
          message: 'User registered successfully',
          token,
          user: {
            id: this.lastID,
            name,
            email
          }
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login user
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to authenticate token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Get user profile
app.get('/api/profile', auth, (req, res) => {
  db.get('SELECT id, name, phone, email, dob, gender, country, city, state, pincode FROM users WHERE id = ?', 
    [req.user.id], (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    });
});

// Create a new booking
app.post('/api/bookings', auth, (req, res) => {
  const { name, email, phone, address, location_from, location_to, guests, arrivals, departures, transport_type } = req.body;
  const user_id = req.user.id;

  const sql = `INSERT INTO bookings (user_id, name, email, phone, address, location_from, location_to, guests, arrivals, departures, transport_type) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [user_id, name, email, phone, address, location_from, location_to, guests, arrivals, departures, transport_type], 
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        message: 'Booking created successfully',
        booking_id: this.lastID
      });
    });
});

// Get user bookings
app.get('/api/bookings', auth, (req, res) => {
  db.all('SELECT * FROM bookings WHERE user_id = ?', [req.user.id], (err, bookings) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(bookings);
  });
});

// Admin route to get all bookings
app.get('/api/admin/bookings', auth, (req, res) => {
  // In a real app, you would check if the user is an admin
  db.all('SELECT * FROM bookings', (err, bookings) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(bookings);
  });
});

// Search for travel options
app.post('/api/search', (req, res) => {
  const { sourceCity, destinationCity, travelDate, modeOfTransport } = req.body;

  // In a real app, you would query an external API or your own database
  // For demo purposes, we'll return mock data
  const mockResults = [
    {
      id: 1,
      type: modeOfTransport,
      name: `${modeOfTransport.toUpperCase()} Express`,
      from: sourceCity,
      to: destinationCity,
      departureTime: '08:00 AM',
      arrivalTime: '12:00 PM',
      duration: '4h',
      price: 1200,
      date: travelDate
    },
    {
      id: 2,
      type: modeOfTransport,
      name: `${modeOfTransport.toUpperCase()} Super Fast`,
      from: sourceCity,
      to: destinationCity,
      departureTime: '10:30 AM',
      arrivalTime: '02:00 PM',
      duration: '3h 30m',
      price: 1500,
      date: travelDate
    },
    {
      id: 3,
      type: modeOfTransport,
      name: `${modeOfTransport.toUpperCase()} Deluxe`,
      from: sourceCity,
      to: destinationCity,
      departureTime: '01:00 PM',
      arrivalTime: '05:30 PM',
      duration: '4h 30m',
      price: 1100,
      date: travelDate
    }
  ];

  res.json(mockResults);
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));