import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const OneMapBasemap = () => {
    const [accessToken, setAccessToken] = useState('');

    // Function to fetch the token from the backend
    const fetchToken = async (forceRefresh = false) => {
      try {
        const response = await fetch(`http://localhost:8080/api/onemap/token?forceRefresh=${forceRefresh}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const token = await response.text();
        setAccessToken(token);
        console.log("Retrieved token:", token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    useEffect(() => {
        fetchToken();

        const map = L.map('map', {
            center: [1.3480, 103.6842],
            zoom: 16
        });

        const sw = L.latLng(1.144, 103.535);
        const ne = L.latLng(1.494, 104.502);
        const bounds = L.latLngBounds(sw, ne);
        map.setMaxBounds(bounds);

        L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png', {
        detectRetina: true,
        maxZoom: 19,
        minZoom: 11,
        attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
        }).addTo(map);

        // Move attribution to top right so navbar doesnt cover it
        map.attributionControl.setPrefix('');
        map.attributionControl.setPosition('topright');

        return () => {
        map.remove();
    };
  }, []);

  return (
    <div id="map" style={{ width: '100vw', height: '100vh' }}></div>
  );
};

export default OneMapBasemap;