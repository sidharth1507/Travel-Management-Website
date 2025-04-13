# Manzil - Travel Management Website

![Manzil Logo](images/logo.jpeg)

## Overview

Manzil is a comprehensive travel management platform that helps users plan and book their perfect journey. The application provides an intuitive interface for booking travel arrangements, managing user accounts, and exploring travel packages.

## Features

### Booking System
- Complete travel booking form with source and destination selection
- Date selection for arrivals and departures
- Multiple transportation options (flight, train, bus, car)
- Traveler information collection

### User Management
- Secure user registration and authentication
- User profile management
- Booking history and status tracking

### Travel Packages
- Browse curated travel packages
- Detailed destination information
- Package pricing and availability

## Installation

```bash
# Clone the repository
git clone https://github.com/sidharth1507/Manzil-Travel-Management.git

# Install all dependencies (backend, frontend, and root)
npm run install-all

# Start the development server
npm run dev
```

## Usage

After starting the development server:
1. Frontend will be available at: http://localhost:5173
2. Backend API will be available at: http://localhost:5000

### Database Schema

#### Booking Information
- ID (PRIMARY KEY): Auto-generated for each new booking
- Name: Customer name
- Email Address: Contact email
- Phone Number: Contact phone
- Address: Customer address
- Source Location: Departure location
- Destination Location: Travel destination
- Number of Travelers: Group size
- Arrival Date: Planned arrival
- Departure Date: Planned departure
- Mode of Transport: Selected transportation method

#### User Accounts
- Name: User's full name
- Email Address: Unique email identifier
- Phone Number: Contact number
- Password: Securely stored password
- Date of Birth: User's birth date
- Country: User's country of residence

## Technology Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- PHP (legacy components)

### Database
- SQLite

### Development Tools
- Vite (React build tool)
- Nodemon (server auto-restart)
- Concurrently (run multiple commands)

## License

ISC

---

© 2023 Manzil Travel Management
