import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Park () {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let script;

    axios.get('/api/onemap/token')
      .then(response => {
        const accessToken = response.data.accessToken;
        setToken(accessToken);

        // Dynamically load the OneMap API script
        script = document.createElement('script');
        script.src = 'https://www.onemap.gov.sg/api/main/v2/index.js';
        script.async = true;
        script.onload = () => {
          if (window.onemap) {
            // Initialize and display the map in the "map" div
            const map = window.onemap.setUpMap({ token: accessToken });
            map.showMap(null, 'map');
          }
        };
        document.body.appendChild(script);
      })
      .catch(error => console.error('Error fetching token:', error));

    // Cleanup: Remove script and clear map if necessary
    return () => {
      if (script) {
        document.body.removeChild(script);
      }
      if (window.onemap && window.onemap.clear) {
        window.onemap.clear();
      }
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default Park;