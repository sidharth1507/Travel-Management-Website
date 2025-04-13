import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import './Book.css'

// Import image
import img9 from '../assets/img-9.jpg'

const Book = ({ user }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const packageId = queryParams.get('package')

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    destination: '',
    guests: 1,
    arrivalDate: new Date(),
    departureDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    specialRequests: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [packages, setPackages] = useState([])

  useEffect(() => {
    document.title = 'Book Your Trip - Manzil'
    
    // In a real app, fetch packages from API
    // For now, using mock data
    const mockPackages = [
      { id: '1', name: 'Mumbai Adventure' },
      { id: '2', name: 'Bangalore Tech Tour' },
      { id: '3', name: 'Indore Food Festival' },
      { id: '4', name: 'Himalayan Retreat' },
      { id: '5', name: 'Goa Beach Vacation' },
      { id: '6', name: 'Kerala Backwaters' }
    ]
    
    setPackages(mockPackages)
    
    // If packageId is provided in URL, set the destination
    if (packageId) {
      const selectedPackage = mockPackages.find(pkg => pkg.id === packageId)
      if (selectedPackage) {
        setFormData(prev => ({
          ...prev,
          destination: selectedPackage.name
        }))
      }
    }
  }, [packageId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDateChange = (name, date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: '', type: '' })

    // Validate dates
    if (formData.departureDate <= formData.arrivalDate) {
      setMessage({
        text: 'Departure date must be after arrival date',
        type: 'error'
      })
      setLoading(false)
      return
    }

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:5000/api/bookings', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        location_from: 'Home',
        location_to: formData.destination,
        guests: formData.guests,
        arrivals: formData.arrivalDate.toISOString().split('T')[0],
        departures: formData.departureDate.toISOString().split('T')[0],
        transport_type: 'Flight'
      }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      })
      
      setMessage({
        text: 'Booking successful! We will contact you shortly with confirmation details.',
        type: 'success'
      })
      
      // Reset form after successful submission
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: '',
        destination: '',
        guests: 1,
        arrivalDate: new Date(),
        departureDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        specialRequests: ''
      })
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Booking failed. Please try again.',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="book-container">
      <section className="book-header">
        <h1>Book Your Dream Trip</h1>
        <p>Fill out the form below to reserve your travel experience</p>
      </section>

      <section className="book-form-section">
        <div className="book-form-container">
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">
                  <i className="fas fa-user"></i> Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">
                  <i className="fas fa-envelope"></i> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">
                  <i className="fas fa-phone"></i> Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">
                  <i className="fas fa-map-marker-alt"></i> Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your address"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="destination">
                  <i className="fas fa-globe"></i> Destination
                </label>
                <select
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a destination</option>
                  {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.name}>{pkg.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="guests">
                  <i className="fas fa-users"></i> Number of Guests
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="arrivalDate">
                  <i className="fas fa-calendar-alt"></i> Arrival Date
                </label>
                <DatePicker
                  id="arrivalDate"
                  selected={formData.arrivalDate}
                  onChange={(date) => handleDateChange('arrivalDate', date)}
                  minDate={new Date()}
                  className="date-picker"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="departureDate">
                  <i className="fas fa-calendar-alt"></i> Departure Date
                </label>
                <DatePicker
                  id="departureDate"
                  selected={formData.departureDate}
                  onChange={(date) => handleDateChange('departureDate', date)}
                  minDate={new Date(formData.arrivalDate.getTime() + 86400000)} // +1 day
                  className="date-picker"
                  required
                />
              </div>
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="specialRequests">
                <i className="fas fa-comment"></i> Special Requests
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Any special requirements or requests?"
                rows="4"
              ></textarea>
            </div>
            
            <button type="submit" className="book-btn" disabled={loading}>
              {loading ? 'Processing...' : 'Book Now'}
            </button>
          </form>
        </div>
        
        <div className="book-image">
          <img src={img9} alt="Book Your Trip" />
          <div className="booking-info">
            <h3>Why Book With Us?</h3>
            <ul>
              <li><i className="fas fa-check"></i> Best price guarantee</li>
              <li><i className="fas fa-check"></i> Free cancellation options</li>
              <li><i className="fas fa-check"></i> 24/7 customer support</li>
              <li><i className="fas fa-check"></i> Verified quality accommodations</li>
              <li><i className="fas fa-check"></i> Secure payment process</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Book