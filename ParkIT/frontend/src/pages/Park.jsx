import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FiSearch } from 'react-icons/fi';
import { MdGpsFixed } from 'react-icons/md';

const Park = () => {
  const [accessToken, setAccessToken] = useState('');
  const [activeTab, setActiveTab] = useState('Map');
  const [showList, setShowList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
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

  // Handle GPS button click
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
          if (markerRef.current) {
            markerRef.current.remove();
          }
          markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert('Unable to retrieve your location');
      }
    );
  };

  // Handle search input change and fetch suggestions from OneMap API
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(value)}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Fetch error:", response.status);
        setSuggestions([]);
        return;
      }
      const data = await response.json();
      if (data && data.results) {
        setSuggestions(data.results);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setSuggestions([]);
    }
  };

  // Handle selecting a suggestion
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.ADDRESS);
    setSuggestions([]);
    const lat = parseFloat(suggestion.LATITUDE);
    const lon = parseFloat(suggestion.LONGITUDE);
    if (mapRef.current) {
      mapRef.current.setView([lat, lon], 16, { animate: true });
      if (markerRef.current) {
        markerRef.current.remove();
      }
      markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Container for search bar and tab menu */}
      <div className="absolute top-0 left-0 w-full z-50 flex flex-col items-center p-4 space-y-3">
        {/* Search Bar */}
        <div className="w-full max-w-sm relative ">
          <div
            className={`flex items-center rounded-full drop-shadow-lg px-3 py-2 h-12 transition duration-300 bg-white ${
              isSearchActive ? 'border-2 border-blue-500 hover:border-blue-500' : 'border-2 border-white hover:border-gray-400'
            }`}
          >
            <FiSearch className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
          </div>
          {/* Suggestions List */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full mt-1 w-full bg-white shadow rounded-md max-h-60 overflow-y-auto z-50">
              {suggestions.map((sug, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(sug)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {sug.ADDRESS}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Segmented control menu */}
        <div className="relative flex bg-black/10 backdrop-blur-md rounded-full p-1 w-60 max-w-sm h-10 cursor-pointer">
          <div
            className="absolute bg-white shadow rounded-full transition-all duration-300 ease-in-out h-8"
            style={{
              width: '46%',
              left: activeTab === 'Map' ? '2%' : '52%',
            }}
          ></div>
          <button
            onClick={() => setActiveTab('Map')}
            className={`relative cursor-pointer flex-1 flex items-center justify-center text-center py-2 transition-colors z-10 ${
              activeTab === 'Map' ? 'text-blue-500 font-semibold' : 'text-gray-700'
            }`}
          >
            Map
          </button>
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
          <button
            onClick={handleGPSClick}
            className="absolute bottom-[34px] right-[20px] bg-white rounded-full p-3 shadow-[0_2px_6px_rgba(0,0,0,0.3)] cursor-pointer z-[1000]"
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
  );
};

export default Park;
