# ParkIT
![Gif+2-min](https://github.com/user-attachments/assets/e5d44693-f02e-448e-9142-11e41289637b)

ParkIT is a web application built with the Java Spring Framework, featuring the MVC (Model-View-Controller) architecture.
Park IT enables drivers to securely register and log in, search for available car parks, manage active parking sessions with real-time navigation and cost calculation, and review their parking history along with saving favorite car parks.

## Project Structure

### Models
| File Directory                    | Description                                                                                                         |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `model/Account.java`              | Handles account information, including email storage and password hashing/validation                                |
| `model/Driver.java`               | Extends Account with driver-specific details, managing parking sessions, favorites, and history.                    |
| `model/FavouriteCarpark.java`     | Represents a user's favorite car park, storing details such as id, name, address, latitude, and longitude.          |
| `model/Carpark.java`              | Contains car park details, including location, lot availability, and parking rates. Data to be populated by URA API |
| `model/ParkingSession.java`       | Manages active parking sessions, including starting/ending sessions, and calculating elapsed time and cost.         |
| `model/ParkingHistory.java`       | Records completed parking sessions, capturing details like cost, location, start time, and duration.                |

### Views
| File Directory        |
|-----------------------|
| `views/Dashboard.js`  |
| `views/Favourites.js` |
| `views/Login.js`      |
| `views/Navigation.js` |
| `views/Profile.js`    |
| `views/Register.js`   |
| `views/Search.js`     |
| `views/Settings.js`   |


## Prerequisites
- **Java Development Kit (JDK):** Version 8 or above.
- **Gradle:** Either use the Gradle wrapper provided or install Gradle separately.
- **IDE:** Recommended IDE is IntelliJ IDEA (or any other Java IDE).



## APIs Used

### URA API
The URA (Urban Redevelopment Authority) API provides real-time data on car park details including available spaces, location and pricing

### OneMap API
The OneMap API, provided by the Singapore Land Authority, offers comprehensive geospatial services and map-based navigation. ParkIT uses the OneMap API to:
- Deliver real-time navigation instructions and route mapping for drivers
- Display interactive maps with marked car park locations
- Calculate estimated travel times and distances for efficient route planning

### Gemini API
The gemini API is used to power our in-app chatbot, to provide support for users

### LTA Datamall API
The LTA (Land Transport Authority) API provides real-time data on road conditions to give drivers updated information on hazards during navigation