import logo from '../../assets/logo.png';
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
        <nav className="nav-bar">
          <img src={logo} alt="logo" />
          <div
            className={mobileMenuClassNames}
            id="mobile-menu"
            onClick={(e) => toggleMobileMenu((prevMobileMenu) => !prevMobileMenu)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={navClassNames}>
            <li className={`nav-item ${location.pathname === "/" ? "nav-link-item" : ""}`}>
              <Link to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {localStorage.getItem('token') ? (
              <li className={`nav-item ${location.pathname === "/contact" ? "nav-link-item" : ""}`}>
                <Link onClick={closeMobileMenu}>
                  <button type="button" className="btn btn-primary sigg" onClick={handleLogOut}>Log Out</button>
                </Link>
              </li>
            ) : (
              <>
                <li className={`nav-item ${location.pathname === "/login" ? "nav-link-item" : ""}`}>
                  <Link to="/login" onClick={closeMobileMenu}>
                    Login
                  </Link>
                </li>
                <li className={`nav-item ${location.pathname === "/signup" ? "nav-link-item" : ""}`}>
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
