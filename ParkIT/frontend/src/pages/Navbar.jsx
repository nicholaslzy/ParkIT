import React from 'react';
import { NavLink } from 'react-router-dom';
// Example icons from react-icons
import { FaParking, FaChartBar, FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <NavLink 
        to="/app/park" 
        style={({ isActive }) => isActive ? { ...styles.link, ...styles.active } : styles.link}
      >
        <FaParking size={24} />
        <div style={styles.label}>Park</div>
      </NavLink>

      <NavLink 
        to="/app/dashboard" 
        style={({ isActive }) => isActive ? { ...styles.link, ...styles.active } : styles.link}
      >
        <FaChartBar size={24} />
        <div style={styles.label}>Stats</div>
      </NavLink>

      <NavLink 
        to="/app/profile" 
        style={({ isActive }) => isActive ? { ...styles.link, ...styles.active } : styles.link}
      >
        <FaUser size={24} />
        <div style={styles.label}>Profile</div>
      </NavLink>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '5px 0',
    zIndex: 1000, // ensure it appears above other elements
  },
  link: {
    textAlign: 'center',
    padding: '5px 30px',
    color: 'darkgrey',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px',
  },
  
  active: {
    color: '#4287f5',
    backgroundColor: '#f2f7ff'
  },

  label: {
    fontSize: '0.8rem',
    marginTop: '4px',
    caretColor: 'transparent'
  },
};

export default Navbar;
