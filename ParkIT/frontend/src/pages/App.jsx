import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import Landing from './Landing';

// Lazy load your pages/components
const Park = lazy(() => import('./Park'));
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

// Layout component to wrap protected routes and include the Navbar
const AppLayout = () => {
  return (
    <>
      <Outlet /> {/* Render the child routes */}
      <Navbar /> {/* Always show the Navbar at the bottom */}
    </>
  );
};

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          <Route path="/app" element={<AppLayout />}>
            <Route path="park" element={<Park />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
