import React from 'react';
import { Link, Element } from 'react-scroll';
import News from './components/News';
import EverythingNews from './components/EverythingNews';
import Hero from './components/Hero';
import Logo from './assets/logo.png'
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
   
      <Element name="news">
      <Hero />
      </Element>
      <Element name="news">
        <News />
      </Element>
      <Element name="everything">
        <EverythingNews />
      </Element>
      <Element name="news">
      <Footer/>
      </Element>
      
      <nav>
        <div className='logo'>
          <img src={Logo} alt="logo" width={100} />
        </div>
        <ul>
        <li>
            <Link to="hero" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li>
            <Link to="news" smooth={true} duration={500}>
              Headlines
            </Link>
          </li>
          <li>
            <Link to="everything" smooth={true} duration={500}>
             Stories
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
