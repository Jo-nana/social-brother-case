import { Fragment, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

import SBlogo from '../../images/header/SBlogo.svg';

import './navigation.styles.scss';


const Navigation = () => {

  // create an active state for the navigation links
  const [homeActive, setHomeActive] = useState(true);
  const [blogActive, setBlogActive] = useState(false);


  // Create a function to toggle the active state of Home and Blog
  const toggleHomeActive = () => {
    setHomeActive(!homeActive);
    setBlogActive(!blogActive);
  }

  const toggleBlogActive = () => {
    setHomeActive(!homeActive);
    setBlogActive(!blogActive);
  }


  return(
    <Fragment>
      <div className="header-navigation">
        <img src={SBlogo} alt="Logo" />
        <h1 className={`nav-link ${homeActive ? 'text-hide' : ''}`}>Blog</h1>
        <div className='nav-links-container'>
          <Link className={`nav-link ${homeActive ? 'active' : ''}`} to='/' onClick={toggleHomeActive}>Home</Link>
          <Link className={`nav-link ${blogActive ? 'active' : ''}`} to='/blog' onClick={toggleBlogActive}>Blog</Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
