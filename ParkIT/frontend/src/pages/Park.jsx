import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FiSearch, FiTarget } from 'react-icons/fi';
import { MdGpsFixed } from 'react-icons/md';

const Park = () => {
  const [accessToken, setAccessToken] = useState('');
  const [activeTab, setActiveTab] = useState('Map');
  const [showList, setShowList] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Fetch OneMap token from backend
  const fetchToken = async (forceRefresh = false, isRetry = false) => {
    try {
      const response = await fetch(`http://localhost:8080/api/onemap/token?forceRefresh=${forceRefresh}`);
      if (!response.ok) {
        if (response.status === 401 && !isRetry) {
          console.warn("401 Error. Refreshing token...");
          return await fetchToken(true, true);
        } else {
  // Fetch OneMap token from backend
  const fetchToken = async (forceRefresh = false, isRetry = false) => {
    try {
      const response = await fetch(`http://localhost:8080/api/onemap/token?forceRefresh=${forceRefresh}`);
      if (!response.ok) {
        if (response.status === 401 && !isRetry) {
          console.warn("401 Error. Refreshing token...");
          return await fetchToken(true, true);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      const token = await response.text();
      setAccessToken(token);
      console.log("Retrieved token:", token);
      return token;
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  };

  // Segmented control animation
  useEffect(() => {
    if (activeTab === 'List') {
      setShowList(true);
    } else {
      setTimeout(() => {
        setShowList(false);
      }, 300);
    }
  }, [activeTab]);

  // Initialize map
  useEffect(() => {
    fetchToken();

    const map = L.map('map', {
      center: [1.3480, 103.6842],
      zoom: 16
    });

    // Save map reference for later use
    mapRef.current = map;

    const sw = L.latLng(1.144, 103.535);
    const ne = L.latLng(1.494, 104.502);
    const bounds = L.latLngBounds(sw, ne);
    map.setMaxBounds(bounds);

    L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png', {
      detectRetina: true,
      maxZoom: 19,
      minZoom: 11,
      attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;vertical-align:middle;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
    }).addTo(map);

    map.attributionControl.setPrefix('');
    map.attributionControl.setPosition('bottomright');
    map.zoomControl.setPosition('bottomleft');

    return () => {
      map.remove();
    };
  }, []);

  // Function to handle GPS button click
  const handleGPSClick = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 16, {
            animate: true,
          });
          // Remove previous marker if exists
          if (markerRef.current) {
            markerRef.current.remove();
          }
          // Add new marker at the user's location
          markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert('Unable to retrieve your location');
      }
    );
  };

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Container for search bar and tab menu */}
        <div className="absolute top-0 left-0 w-full z-50 flex flex-col items-center p-4 space-y-3">
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full shadow px-3 py-2 h-12 w-full max-w-sm">
            <FiSearch className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
          </div>

          {/* Segmented control menu */}
          <div className="relative flex bg-black/10 backdrop-blur-md rounded-full p-1 w-60 max-w-sm h-10 cursor-pointer">
            {/* White pill */}
            <div
              className="absolute bg-white shadow rounded-full transition-all duration-300 ease-in-out h-8"
              style={{
                width: '46%',
                left: activeTab === 'Map' ? '2%' : '52%',
              }}
            ></div>
            {/* Map Tab */}
            <button
              onClick={() => setActiveTab('Map')}
              className={`relative cursor-pointer flex-1 flex items-center justify-center text-center py-2 transition-colors z-10 ${
                activeTab === 'Map' ? 'text-blue-500 font-semibold' : 'text-gray-700'
              }`}
            >
              Map
            </button>
            {/* List Tab */}
            <button
              onClick={() => setActiveTab('List')}
              className={`relative cursor-pointer flex-1 flex items-center justify-center text-center py-2 transition-colors z-10 ${
                activeTab === 'List' ? 'text-blue-500 font-semibold' : 'text-gray-700'
              }`}
            >
              List
            </button>
          </div>
        </div>

        <div className="flex relative h-full w-full">
          {/* Map Container */}
          <div
            className={`transition-transform duration-300 ease-in-out ${
              activeTab === 'List' ? 'transform -translate-x-full' : 'transform translate-x-0'
            }`}
            style={{ width: '100vw', height: 'calc(100vh - 62px)', flexShrink: 0 }}
          >
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
            {/* GPS Button */}
            <button
              onClick={handleGPSClick}
              style={{
                position: 'absolute',
                bottom: '34px',
                right: '20px',
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '50%',
                padding: '12px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                zIndex: 1000,
              }}
              title="Center map on your location"
            >
              <MdGpsFixed size={24} color="#4287f5" />
            </button>
          </div>

          {/* List Container */}
          {showList && (
            <div
              className={`bg-white transition-transform duration-300 ease-in-out absolute top-0 left-full transform ${
                activeTab === 'List' ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{ height: 'calc(100vh - 60px)', width: '100vw', flexShrink: 0, zIndex: 100 }}
            >
              <div className="p-4">Hi</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Park;
