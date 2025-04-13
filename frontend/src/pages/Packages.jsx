import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Packages.css'

// Import images
import mumbaiImg from '../assets/mumbai.jpg'
import bangaloreImg from '../assets/bangalore.jpg'
import indoreImg from '../assets/indore.jpg'
import img1 from '../assets/img-1.jpg'
import img2 from '../assets/img-2.jpg'
import img3 from '../assets/img-3.jpg'

const Packages = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Travel Packages - Manzil'
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      // In a real app, this would fetch from the backend
      // const response = await axios.get('http://localhost:5000/api/packages')
      // setPackages(response.data)
      
      // For now, using mock data
      setPackages([
        {
          id: 1,
          name: 'Mumbai Adventure',
          description: 'Experience the vibrant city life of Mumbai with guided tours of iconic landmarks.',
          price: 15000,
          duration: '3 days',
          location: 'Mumbai, India',
          image: mumbaiImg,
          rating: 4.7
        },
        {
          id: 2,
          name: 'Bangalore Tech Tour',
          description: 'Explore the Silicon Valley of India with visits to tech parks and cultural sites.',
          price: 12000,
          duration: '4 days',
          location: 'Bangalore, India',
          image: bangaloreImg,
          rating: 4.5
        },
        {
          id: 3,
          name: 'Indore Food Festival',
          description: 'Indulge in the culinary delights of Indore with food tours and cooking classes.',
          price: 8000,
          duration: '2 days',
          location: 'Indore, India',
          image: indoreImg,
          rating: 4.8
        },
        {
          id: 4,
          name: 'Himalayan Retreat',
          description: 'Escape to the serene mountains with trekking, meditation, and stunning views.',
          price: 25000,
          duration: '7 days',
          location: 'Himachal Pradesh, India',
          image: img1,
          rating: 4.9
        },
        {
          id: 5,
          name: 'Goa Beach Vacation',
          description: 'Relax on the beautiful beaches of Goa with water sports and nightlife experiences.',
          price: 18000,
          duration: '5 days',
          location: 'Goa, India',
          image: img2,
          rating: 4.6
        },
        {
          id: 6,
          name: 'Kerala Backwaters',
          description: 'Cruise through the tranquil backwaters of Kerala with authentic local experiences.',
          price: 22000,
          duration: '6 days',
          location: 'Kerala, India',
          image: img3,
          rating: 4.8
        }
      ])
    } catch (err) {
      setError('Failed to load packages. Please try again later.')
      console.error('Error fetching packages:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading-container">Loading packages...</div>
  }

  if (error) {
    return <div className="error-container">{error}</div>
  }

  return (
    <div className="packages-container">
      <section className="packages-header">
        <h1>Explore Our Packages</h1>
        <p>Discover amazing travel experiences curated just for you</p>
      </section>

      <section className="packages-filter">
        <div className="search-container">
          <input type="text" placeholder="Search destinations..." />
          <button><i className="fas fa-search"></i></button>
        </div>
      </section>

      <section className="packages-grid">
        {packages.map(pkg => (
          <div className="package-card" key={pkg.id}>
            <div className="package-image">
              <img src={pkg.image} alt={pkg.name} />
              <div className="package-price">
                <span>₹{pkg.price.toLocaleString()}</span>
              </div>
            </div>
            <div className="package-content">
              <h3>{pkg.name}</h3>
              <p className="package-location">
                <i className="fas fa-map-marker-alt"></i> {pkg.location}
              </p>
              <p className="package-duration">
                <i className="fas fa-clock"></i> {pkg.duration}
              </p>
              <div className="package-rating">
                <i className="fas fa-star"></i>
                <span>{pkg.rating}</span>
              </div>
              <p className="package-description">{pkg.description}</p>
              <div className="package-actions">
                <Link to={`/book?package=${pkg.id}`} className="btn">Book Now</Link>
                <button className="btn-outline">
                  <i className="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Packages