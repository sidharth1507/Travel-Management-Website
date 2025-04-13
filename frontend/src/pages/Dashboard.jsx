import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'

const Dashboard = ({ user }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Dashboard - Manzil'
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      // In a real app, this would fetch from the backend
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      })
      setBookings(response.data)
      
      // For now, using mock data
      setBookings([
        {
          id: 1,
          destination: 'Mumbai Adventure',
          arrivalDate: '2023-12-15',
          departureDate: '2023-12-18',
          guests: 2,
          status: 'confirmed',
          totalAmount: 30000
        },
        {
          id: 2,
          destination: 'Goa Beach Vacation',
          arrivalDate: '2024-01-10',
          departureDate: '2024-01-15',
          guests: 3,
          status: 'pending',
          totalAmount: 54000
        },
        {
          id: 3,
          destination: 'Himalayan Retreat',
          arrivalDate: '2024-02-20',
          departureDate: '2024-02-27',
          guests: 2,
          status: 'confirmed',
          totalAmount: 50000
        }
      ])
    } catch (err) {
      setError('Failed to load bookings. Please try again later.')
      console.error('Error fetching bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  const cancelBooking = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return
    
    try {
      setLoading(true)
      // In a real app, this would send a request to the backend
      // await axios.put(`http://localhost:5000/api/bookings/${id}/cancel`, {}, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // })
      
      // For now, just update the local state
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status: 'cancelled' } : booking
      ))
    } catch (err) {
      setError('Failed to cancel booking. Please try again later.')
      console.error('Error cancelling booking:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading && bookings.length === 0) {
    return <div className="loading-container">Loading your bookings...</div>
  }

  if (error) {
    return <div className="error-container">{error}</div>
  }

  return (
    <div className="dashboard-container">
      <section className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <p>Manage your bookings and account information</p>
      </section>

      <section className="dashboard-content">
        <div className="user-info-card">
          <div className="user-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="user-details">
            <h3>{user.name}</h3>
            <p><i className="fas fa-envelope"></i> {user.email}</p>
            {user.phone && <p><i className="fas fa-phone"></i> {user.phone}</p>}
            <Link to="/profile" className="btn-outline">Edit Profile</Link>
          </div>
        </div>

        <div className="dashboard-bookings">
          <div className="section-header">
            <h2>Your Bookings</h2>
            <Link to="/book" className="btn">Book New Trip</Link>
          </div>

          {bookings.length === 0 ? (
            <div className="no-bookings">
              <i className="fas fa-calendar-times"></i>
              <p>You don't have any bookings yet.</p>
              <Link to="/packages" className="btn">Explore Packages</Link>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map(booking => (
                <div className="booking-card" key={booking.id}>
                  <div className="booking-header">
                    <h3>{booking.destination}</h3>
                    <span className={`booking-status ${booking.status}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="booking-details">
                    <p>
                      <i className="fas fa-calendar"></i>
                      <span>{formatDate(booking.arrivalDate)} - {formatDate(booking.departureDate)}</span>
                    </p>
                    <p>
                      <i className="fas fa-users"></i>
                      <span>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                    </p>
                    <p>
                      <i className="fas fa-rupee-sign"></i>
                      <span>₹{booking.totalAmount.toLocaleString()}</span>
                    </p>
                  </div>
                  
                  <div className="booking-actions">
                    <Link to={`/booking/${booking.id}`} className="btn-outline">
                      <i className="fas fa-eye"></i> View Details
                    </Link>
                    {booking.status !== 'cancelled' && (
                      <button 
                        className="btn-cancel" 
                        onClick={() => cancelBooking(booking.id)}
                        disabled={loading}
                      >
                        <i className="fas fa-times"></i> Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Dashboard