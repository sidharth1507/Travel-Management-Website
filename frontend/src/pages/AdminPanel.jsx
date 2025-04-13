import { useState, useEffect } from 'react'
import axios from 'axios'
import './AdminPanel.css'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])
  const [bookings, setBookings] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Admin Panel - Manzil'
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      // In a real app, these would be API calls
      // const usersResponse = await axios.get('http://localhost:5000/api/admin/users')
      // const bookingsResponse = await axios.get('http://localhost:5000/api/admin/bookings')
      // const packagesResponse = await axios.get('http://localhost:5000/api/admin/packages')
      
      // Mock data for demonstration
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '9876543210', isAdmin: false, createdAt: '2023-11-10' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '8765432109', isAdmin: false, createdAt: '2023-11-12' },
        { id: 3, name: 'Admin User', email: 'admin@manzil.com', phone: '7654321098', isAdmin: true, createdAt: '2023-11-01' }
      ])
      
      setBookings([
        { id: 1, userId: 1, userName: 'John Doe', destination: 'Mumbai Adventure', arrivalDate: '2023-12-15', departureDate: '2023-12-18', guests: 2, status: 'confirmed', totalAmount: 30000 },
        { id: 2, userId: 2, userName: 'Jane Smith', destination: 'Goa Beach Vacation', arrivalDate: '2024-01-10', departureDate: '2024-01-15', guests: 3, status: 'pending', totalAmount: 54000 },
        { id: 3, userId: 1, userName: 'John Doe', destination: 'Himalayan Retreat', arrivalDate: '2024-02-20', departureDate: '2024-02-27', guests: 2, status: 'confirmed', totalAmount: 50000 },
        { id: 4, userId: 2, userName: 'Jane Smith', destination: 'Kerala Backwaters', arrivalDate: '2024-03-05', departureDate: '2024-03-11', guests: 4, status: 'cancelled', totalAmount: 88000 }
      ])
      
      setPackages([
        { id: 1, name: 'Mumbai Adventure', price: 15000, duration: '3 days', location: 'Mumbai, India', featured: true, bookings: 12 },
        { id: 2, name: 'Bangalore Tech Tour', price: 12000, duration: '4 days', location: 'Bangalore, India', featured: false, bookings: 8 },
        { id: 3, name: 'Indore Food Festival', price: 8000, duration: '2 days', location: 'Indore, India', featured: true, bookings: 15 },
        { id: 4, name: 'Himalayan Retreat', price: 25000, duration: '7 days', location: 'Himachal Pradesh, India', featured: true, bookings: 20 },
        { id: 5, name: 'Goa Beach Vacation', price: 18000, duration: '5 days', location: 'Goa, India', featured: true, bookings: 30 },
        { id: 6, name: 'Kerala Backwaters', price: 22000, duration: '6 days', location: 'Kerala, India', featured: false, bookings: 18 }
      ])
    } catch (err) {
      setError('Failed to load data. Please try again later.')
      console.error('Error fetching admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      // In a real app, this would be an API call
      // await axios.put(`http://localhost:5000/api/admin/bookings/${bookingId}`, { status: newStatus })
      
      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ))
    } catch (err) {
      setError('Failed to update booking status. Please try again.')
      console.error('Error updating booking status:', err)
    }
  }

  const toggleFeatured = async (packageId) => {
    try {
      const pkg = packages.find(p => p.id === packageId)
      if (!pkg) return
      
      // In a real app, this would be an API call
      // await axios.put(`http://localhost:5000/api/admin/packages/${packageId}`, { featured: !pkg.featured })
      
      // Update local state
      setPackages(packages.map(p => 
        p.id === packageId ? { ...p, featured: !p.featured } : p
      ))
    } catch (err) {
      setError('Failed to update package. Please try again.')
      console.error('Error updating package:', err)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return <div className="loading-container">Loading admin data...</div>
  }

  if (error) {
    return <div className="error-container">{error}</div>
  }

  return (
    <div className="admin-container">
      <section className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage users, bookings, and packages</p>
      </section>

      <section className="admin-content">
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="fas fa-users"></i> Users
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <i className="fas fa-calendar-check"></i> Bookings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            <i className="fas fa-suitcase"></i> Packages
          </button>
        </div>

        <div className="admin-panel-content">
          {activeTab === 'users' && (
            <div className="users-panel">
              <div className="panel-header">
                <h2>User Management</h2>
                <div className="search-container">
                  <input type="text" placeholder="Search users..." />
                  <button><i className="fas fa-search"></i></button>
                </div>
              </div>
              
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Joined Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <span className={`role-badge ${user.isAdmin ? 'admin' : 'user'}`}>
                            {user.isAdmin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td>
                          <button className="action-btn edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="action-btn delete">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bookings-panel">
              <div className="panel-header">
                <h2>Booking Management</h2>
                <div className="search-container">
                  <input type="text" placeholder="Search bookings..." />
                  <button><i className="fas fa-search"></i></button>
                </div>
              </div>
              
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Destination</th>
                      <th>Dates</th>
                      <th>Guests</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.userName}</td>
                        <td>{booking.destination}</td>
                        <td>
                          {formatDate(booking.arrivalDate)} - {formatDate(booking.departureDate)}
                        </td>
                        <td>{booking.guests}</td>
                        <td>₹{booking.totalAmount.toLocaleString()}</td>
                        <td>
                          <select 
                            className={`status-select ${booking.status}`}
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <button className="action-btn view">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="action-btn delete">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="packages-panel">
              <div className="panel-header">
                <h2>Package Management</h2>
                <button className="btn">
                  <i className="fas fa-plus"></i> Add New Package
                </button>
              </div>
              
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Duration</th>
                      <th>Location</th>
                      <th>Bookings</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map(pkg => (
                      <tr key={pkg.id}>
                        <td>{pkg.id}</td>
                        <td>{pkg.name}</td>
                        <td>₹{pkg.price.toLocaleString()}</td>
                        <td>{pkg.duration}</td>
                        <td>{pkg.location}</td>
                        <td>{pkg.bookings}</td>
                        <td>
                          <button 
                            className={`featured-toggle ${pkg.featured ? 'active' : ''}`}
                            onClick={() => toggleFeatured(pkg.id)}
                          >
                            {pkg.featured ? 'Yes' : 'No'}
                          </button>
                        </td>
                        <td>
                          <button className="action-btn edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="action-btn delete">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default AdminPanel