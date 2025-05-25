import React from 'react';
import logo from './assets/logobiale.png';

const Navbar = () => (
  <nav className="navbar bg-dark text-white p-3">
    <img src={logo} alt="Logo" style={{ height: '100px' }} />
  </nav>
);

export default Navbar;
