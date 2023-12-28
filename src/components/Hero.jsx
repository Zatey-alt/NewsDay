import React from 'react'
import { Link, Element } from 'react-scroll';

const Hero = () => {
  return (
    <div className='hero'>
      <div className='left'>
        <h1>NewsDay: Your World in Your Hands</h1>
        <p>Get the latest news from around the globe. Stay informed, stay connected.</p>
        <div className="explore-button-container">
        <Link to="everything" smooth={true} duration={500} className="explore-button">
          Explore News Feed
        </Link>
      </div>
    
      </div>
      
      
    </div>
  )
}

export default Hero
