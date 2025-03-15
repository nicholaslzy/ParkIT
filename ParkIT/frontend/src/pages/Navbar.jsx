import React from 'react';
import { Link } from 'react-router-dom';
// Example icons from react-icons
import { FaParking, FaChartBar, FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <Link to="/park" style={styles.link}>
        <FaParking size={24} />
        <div style={styles.label}>Park</div>
      </Link>

      <Link to="/dashboard" style={styles.link}>
        <FaChartBar size={24} />
        <div style={styles.label}>Stats</div>
      </Link>

      <Link to="/profile" style={styles.link}>
        <FaUser size={24} />
        <div style={styles.label}>Profile</div>
      </Link>
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
    borderTop: '1px solid #ccc',
    padding: '8px 0',
  },
  link: {
    textAlign: 'center',
    color: 'inherit',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    fontSize: '0.8rem',
    marginTop: '4px',
  },
};

export default Navbar;
