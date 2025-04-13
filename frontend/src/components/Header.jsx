import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

// Import logo
import logo from '../assets/logo.jpeg'

const Header = ({ user, logout }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Manzil Logo" />
        <Link to="/" className="logo">Manzil</Link>
      </div>
      
      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/packages" onClick={() => setMenuOpen(false)}>Packages</Link>
        <Link to="/book" onClick={() => setMenuOpen(false)}>Book</Link>
        {user ? (
          <>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
          </>
        )}
      </nav>
      
      <div id="menu-btn" className={`menu-btn ${menuOpen ? 'fa-times' : 'fa-bars'}`} onClick={toggleMenu}>
        <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>
    </header>
  )
}

export default Header