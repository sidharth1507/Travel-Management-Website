import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import './Home.css'

// Import images
import img1 from '../assets/img-1.jpg'
import img2 from '../assets/img-2.jpg'
import img3 from '../assets/img-3.jpg'
import img4 from '../assets/img-4.jpg'
import img5 from '../assets/img-5.jpg'
import img6 from '../assets/img-6.jpg'
import img7 from '../assets/img-7.jpg'
import img8 from '../assets/img-8.jpg'
import img9 from '../assets/img-9.jpg'
import img10 from '../assets/img-10.jpg'

const Home = () => {
  useEffect(() => {
    document.title = 'Manzil - Travel Management'
  }, [])

  return (
    <div className="page-transition">
      <section className="home">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 5000 }}
          loop={true}
          className="home-slider"
        >
          <SwiperSlide>
            <div className="slide" style={{ backgroundImage: `url(${img1})` }}>
              <div className="content">
                <span>explore, discover, travel</span>
                <h3>get to new destinations</h3>
                <Link to="/packages" className="btn">discover more</Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide" style={{ backgroundImage: `url(${img2})` }}>
              <div className="content">
                <span>explore, discover, travel</span>
                <h3>unearth the scenic beauty</h3>
                <Link to="/packages" className="btn">discover more</Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide" style={{ backgroundImage: `url(${img3})` }}>
              <div className="content">
                <span>explore, discover, travel</span>
                <h3>relish every moment of the trip</h3>
                <Link to="/packages" className="btn">discover more</Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="services">
        <h1 className="heading-title">our services</h1>
        <div className="box-container">
          <div className="box">
            <img src={img4} alt="Adventure" />
            <h3>adventure</h3>
          </div>
          
          <div className="box">
            <img src={img5} alt="Tour Guide" />
            <h3>tour guide</h3>
          </div>

          <div className="box">
            <img src={img6} alt="Trekking" />
            <h3>trekking</h3>
          </div>

          <div className="box">
            <img src={img7} alt="Camp Fire" />
            <h3>camp fire</h3>
          </div>

          <div className="box">
            <img src={img8} alt="Off Road" />
            <h3>off road</h3>
          </div>

          <div className="box">
            <img src={img9} alt="Camping" />
            <h3>camping</h3>
          </div>
        </div>
      </section>

      <section className="home-about">
        <div className="image">
          <img src={img10} alt="About Us" />
        </div>

        <div className="content">
          <h3>about us</h3>
          <p>Manzil is a comprehensive travel management platform designed to simplify business travel. We provide seamless booking experiences, cost-effective solutions, and personalized service to meet all your corporate travel needs.</p>
          <Link to="/about" className="btn">read more</Link>
        </div>
      </section>

      <section className="home-packages">
        <h1 className="heading-title">our packages</h1>
        
        <div className="box-container">
          <div className="box">
            <div className="image">
              <img src={img1} alt="Package" />
            </div>
            <div className="content">
              <h3>adventure & tour</h3>
              <p>Experience thrilling adventures and guided tours to the most exciting destinations.</p>
              <Link to="/book" className="btn">book now</Link>
            </div>
          </div>

          <div className="box">
            <div className="image">
              <img src={img2} alt="Package" />
            </div>
            <div className="content">
              <h3>adventure & tour</h3>
              <p>Discover hidden gems and breathtaking landscapes with our curated tour packages.</p>
              <Link to="/book" className="btn">book now</Link>
            </div>
          </div>

          <div className="box">
            <div className="image">
              <img src={img3} alt="Package" />
            </div>
            <div className="content">
              <h3>adventure & tour</h3>
              <p>Unforgettable experiences await with our premium adventure packages.</p>
              <Link to="/book" className="btn">book now</Link>
            </div>
          </div>
        </div>

        <div className="load-more">
          <Link to="/packages" className="btn">load more</Link>
        </div>
      </section>

      <section className="home-offer">
        <div className="content">
          <h3>up to 50% off</h3>
          <p>Book your next business trip with us and enjoy exclusive discounts and premium services tailored for corporate travelers.</p>
          <Link to="/book" className="btn">book now</Link>
        </div>
      </section>
    </div>
  )
}

export default Home