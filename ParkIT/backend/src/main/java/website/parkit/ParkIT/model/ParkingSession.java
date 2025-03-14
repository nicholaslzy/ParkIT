package website.parkit.ParkIT.model;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;

public class ParkingSession {
    private int id;
    private int driverID;
    private String carparkName;
    private String carparkAddress;
    private float hourlyRate;
    private double latitude;
    private double longitude;
    private LocalDateTime startTime;

    public ParkingSession(int id, String carparkName, String carparkAddress, float hourlyRate, double latitude, double longitude, LocalDateTime starTime) {
        this.id = id;
        this.carparkName = carparkName;
        this.carparkAddress = carparkAddress;
        this.hourlyRate = hourlyRate;
        this.latitude = latitude;
        this.longitude = longitude;
        this.startTime = starTime;
    }


    /**
     * Calculates the elapsed time of the parking session from start time to current time
     *
     * @return elapsed time
     */
    public long getElapsedTime() {
        //TODO
        return 0;
    }

    /**
     * Calculates the cost incurred for the elapsed time of the parking session
     * The cost is based on the hourly rate
     *
     * @return the cost calculated based on elapsed time and hourly rate
     */
    public double getElapsedCost() {
        //TODO
        return 0;
    }


}



