package website.parkit.ParkIT.model;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;


public class ParkingHistory {
    private float cost;
    private double latitude;
    private double longitude;
    private LocalDateTime startTime;
    private float duration;

    public ParkingHistory(float cost, double latitude, double longitude, LocalDateTime startTime, float duration) {
        this.cost = cost;
        this.latitude = latitude;
        this.longitude = longitude;
        this.startTime = startTime;
        this.duration = duration;
    }

}