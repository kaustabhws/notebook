import logo_dark from '../../assets/logo-dark.png';
import logo_light from '../../assets/logo-light.png'
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './NavBar.css';

function Navbar(props) {
  const [mobileMenu, toggleMobileMenu] = useState(false);

  let location = useLocation()
  useEffect(() => {
    // console.log(location.pathname)
  }, [location]);

  useEffect(() => {
    if (mobileMenu) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [mobileMenu]);

  const closeMobileMenu = () => {
    toggleMobileMenu(false);
  };

  var navClassNames = classNames('nav', {
    'mobile-nav': mobileMenu,
  });

  var mobileMenuClassNames = classNames('menu-toggle', {
    'is-active': mobileMenu,
  });

  const handleLogOut = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <>
      <div className="nav-wrapper">
        <nav className={`nav-bar ${props.mode}`}>
          <img src={props.mode === 'light' ? logo_light : logo_dark} alt="logo" />
          <div
            className={mobileMenuClassNames}
            id="mobile-menu"
            onClick={(e) => toggleMobileMenu((prevMobileMenu) => !prevMobileMenu)}
          >
            <span className={`bar ${props.mode}-toggle`}></span>
            <span className={`bar ${props.mode}-toggle mid`}></span>
            <span className={`bar ${props.mode}-toggle`}></span>
          </div>
          <ul className={navClassNames}>
            <li className="nav-item">
              {props.myMode === 'light' ? (
                <i className="fa-solid fa-circle-half-stroke fa-rotate-180" onClick={props.toggleMode}></i>
              ) : (
                <i className="fa-solid fa-circle-half-stroke" onClick={props.toggleMode}></i>
              )}
            </li>
            <li className={`nav-item ${props.mode} ${location.pathname === "/" ? "nav-link-item" : ""}`}>
              <Link to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {localStorage.getItem('token') ? (
              <li className={`nav-item ${props.mode} ${location.pathname === "/contact" ? "nav-link-item" : ""}`}>
                <Link onClick={closeMobileMenu}>
                  <button type="button" className="btn btn-primary sigg" onClick={handleLogOut}>Log Out</button>
                </Link>
              </li>
            ) : (
              <>
                <li className={`nav-item ${props.mode} ${location.pathname === "/login" ? "nav-link-item" : ""}`}>
                  <Link to="/login" onClick={closeMobileMenu}>
                    Login
                  </Link>
                </li>
                <li className={`nav-item ${props.mode} ${location.pathname === "/signup" ? "nav-link-item" : ""}`}>
                  <Link to="/signup" onClick={closeMobileMenu}>
                    <button type="button" className="btn btn-primary sigg">Sign Up</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
