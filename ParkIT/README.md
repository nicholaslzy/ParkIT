# ParkIT

ParkIT is a web application built with the Java Spring Framewor as backend, and react.js and tailwind CSS frameworks for frontend.
Park IT enables drivers to securely register and log in, search for available car parks, manage active parking sessions with real-time navigation and cost calculation, and review their parking history along with saving favorite car parks.

## Tech stack

### Backend
- **Language:** Java
- **Framework:** Spring Boot
- **Build Tool:** Gradle

### Frontend
- **Framework:** React
- **Bundler/Dev Server:** Vite
- **Styling:** Tailwind CSS



## Getting Started

1. **Prerequisites**
    - **Java 21** (JDK)
    - **Node.js** (includes npm)
2. **Open Terminal** 

   On Windows, **avoid using PowerShell or CMD**. Use Git Bash or WSL

2. **Navigate to Project Root**  
   ```bash
   cd ParkIT
   
3. **Run startup script**  
    ```bash
    ./start.sh
    ```
    The shell script installs required dependencies, and runs backend + frontend servers
4. **Open Browser** 
    http://localhost:5173/

## Debugging (view logs)

- **Backend**
    - ```cd backend```
    - ```./gradlew bootRun```
    
- **Frontend** 
    - ```cd frontend```
    - ```npm run dev```



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
