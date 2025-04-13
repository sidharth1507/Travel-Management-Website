import { useEffect } from 'react'
import './About.css'

// Import images
import img2 from '../assets/img-2.jpg'
import img4 from '../assets/img-4.jpg'
import img5 from '../assets/img-5.jpg'
import img6 from '../assets/img-6.jpg'

const About = () => {
  useEffect(() => {
    document.title = 'About Us - Manzil'
  }, [])

  return (
    <div className="about-container">
      <section className="about-header">
        <h1>About Us</h1>
        <p>Learn more about Manzil and our mission to provide exceptional travel experiences</p>
      </section>

      <section className="about-content">
        <div className="about-image">
          <img src={img2} alt="About Manzil" />
        </div>
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, Manzil was born from a passion for travel and a desire to make
            exploring the world accessible to everyone. Our name, which means "destination" in Hindi,
            reflects our commitment to helping you reach your dream destinations.
          </p>
          <p>
            What started as a small team of travel enthusiasts has grown into a comprehensive
            travel management platform that serves thousands of travelers each year.
          </p>
          <h2>Our Mission</h2>
          <p>
            At Manzil, our mission is to create memorable travel experiences that inspire,
            educate, and connect people across cultures and borders. We believe that travel
            has the power to transform lives and broaden perspectives.
          </p>
          <h2>Our Values</h2>
          <ul>
            <li><strong>Excellence:</strong> We strive for excellence in every aspect of our service.</li>
            <li><strong>Integrity:</strong> We operate with honesty and transparency in all our dealings.</li>
            <li><strong>Innovation:</strong> We continuously seek new ways to improve the travel experience.</li>
            <li><strong>Sustainability:</strong> We are committed to responsible and sustainable tourism practices.</li>
          </ul>
        </div>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-container">
          <div className="team-member">
            <img src={img4} alt="Team Member" />
            <h3>Rahul Sharma</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src={img5} alt="Team Member" />
            <h3>Priya Patel</h3>
            <p>Travel Expert</p>
          </div>
          <div className="team-member">
            <img src={img6} alt="Team Member" />
            <h3>Amit Singh</h3>
            <p>Customer Experience</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About