import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">
          {' '}
          Your One-Stop Shop for Gadgets and Home Essentials
        </h1>
        <img
          src="https://e0.pxfuel.com/wallpapers/72/383/desktop-wallpaper-e-commerce-px-shopping-cart-thumbnail.jpg"
          alt="clothes that get you noticed"
          className="home-mobile-img"
        />
        <p className="home-description">
          Welcome to GadgetWorld, your ultimate destination for the latest
          gadgets and home essentials! Explore our vast collection of
          cutting-edge electronics and must-have products that will transform
          your home into a modern paradise. At GadgetWorld, we take pride in
          curating the finest selection of gadgets, electronics, and home
          necessities to cater to your every need. Whether you are a tech
          enthusiast, a homemaker, or a gift seeker, our user-friendly platform
          ensures a seamless shopping experience.
        </p>
        <Link to="/products">
          <button type="button" className="shop-now-button">
            Shop Now
          </button>
        </Link>
      </div>
      <img
        src="https://e0.pxfuel.com/wallpapers/72/383/desktop-wallpaper-e-commerce-px-shopping-cart-thumbnail.jpg"
        alt="clothes that get you noticed"
        className="home-desktop-img"
      />
    </div>
  </>
)

export default Home
