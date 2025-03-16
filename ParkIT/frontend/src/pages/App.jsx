import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate  } from 'react-router-dom';
import Navbar from './Navbar';
import Landing from './Landing';

const Park = lazy(() => import('./Park'));
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

// App Layout to show navbar at the bottom
const AppLayout = () => {
  return (
    <>
      <Outlet /> {/* Render the child routes */}
      <Navbar /> {/* Navbar at the bottom */}
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
          <Route index element={<Navigate to="park" replace />} />
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
