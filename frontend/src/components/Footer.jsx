import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="box-container">
        <div className="box">
          <h3>Quick Links</h3>
          <Link to="/"><i className="fas fa-angle-right"></i> Home</Link>
          <Link to="/about"><i className="fas fa-angle-right"></i> About</Link>
          <Link to="/packages"><i className="fas fa-angle-right"></i> Packages</Link>
          <Link to="/book"><i className="fas fa-angle-right"></i> Book</Link>
        </div>

        <div className="box">
          <h3>Extra Links</h3>
          <Link to="#"><i className="fas fa-angle-right"></i> Ask Questions</Link>
          <Link to="#"><i className="fas fa-angle-right"></i> About Us</Link>
          <Link to="#"><i className="fas fa-angle-right"></i> Privacy Policy</Link>
          <Link to="#"><i className="fas fa-angle-right"></i> Terms of Use</Link>
        </div>

        <div className="box">
          <h3>Contact Info</h3>
          <Link to="#"><i className="fas fa-phone"></i> +123 456 7890</Link>
          <Link to="#"><i className="fas fa-phone"></i> +111 222 3333</Link>
          <Link to="#"><i className="fas fa-envelope"></i> support@manzil.com</Link>
          <Link to="#"><i className="fas fa-map"></i> Mumbai, India - 400001</Link>
        </div>

        <div className="box">
          <h3>Follow Us</h3>
          <Link to="#"><i className="fab fa-facebook-f"></i> Facebook</Link>
          <Link to="#"><i className="fab fa-twitter"></i> Twitter</Link>
          <Link to="#"><i className="fab fa-instagram"></i> Instagram</Link>
          <Link to="#"><i className="fab fa-linkedin"></i> LinkedIn</Link>
        </div>
      </div>

      <div className="credit">
        Created by <span>Manzil Team</span> | All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer