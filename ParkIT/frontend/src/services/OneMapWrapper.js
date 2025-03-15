// OneMapWrapper.js
import axios from 'axios';

/**
 * OneMapWrapper
 * Encapsulates interactions with the OneMap API v2.
 *
 * Handles:
 * - Initializing the OneMap map.
 * - Making API calls to OneMap, handling authentication (token).
 * - Automatically refreshing the OneMap API token when it expires (401 Unauthorized error).
 * - Providing a clean interface for common OneMap operations (e.g., geocoding).
 * - Cleaning up map resources.
 */

class OneMapWrapper {
    constructor(initialToken) {
        this.token = initialToken;
        this.map = null; // Will hold the OneMap map instance
    }

    async refreshToken() {
        try {
            const response = await axios.get('/api/onemap/token');
            this.token = response.data.accessToken;
            console.log("Token refreshed successfully (frontend)");
            return this.token;
        } catch (error) {
            console.error("Error refreshing token:", error);
            // Handle refresh failure (e.g., redirect to login, show error)
            throw error; // Re-throw to let calling code handle it
        }
    }

     initMap(divId) {
          if(!window.onemap) {
            console.error("OneMap API is not loaded.");
            return;
          }
          if (!this.token) {
              console.error("Token is not available.");
              return;
          }

        this.map = window.onemap.setUpMap({token: this.token}); //Pass the onemap map to a variable.
        this.map.showMap(null, divId); // Display the map.

    }

    async makeApiCall(apiFunction, ...args) {
        if (!window.onemap) {
            throw new Error("OneMap API is not loaded.");
        }

        try {
            // Attempt the API call
            return await apiFunction(this.token, ...args);
        } catch (error) {
            if (error.message === "Unauthorized") { // Check for 401
              // Refresh the token
              await this.refreshToken();

              // Retry the original API call with the new token
              return await apiFunction(this.token,...args);
            }
            // Handle other errors
             console.error("OneMap API call failed:", error);
            throw error;
        }
    }
//   // Example method: Geocode
//   async geocode(query) {
//     return this.makeApiCall(window.onemap.geocode, query);
//   }

//   // Example method: GoTo
//   async goTo(latitude, longitude) {
//       return this.makeApiCall(window.onemap.goTo, latitude, longitude);
//     }

//     cleanup() {
//       if(this.map){
//         this.map.clear();
//         this.map = null; // Important for garbage collection.
//       }
//     }

    // ... Add other wrapper methods for OneMap API functions you need ...
}

export default OneMapWrapper;