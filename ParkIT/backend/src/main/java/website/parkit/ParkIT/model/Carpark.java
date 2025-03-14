package website.parkit.ParkIT.model;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;


public class Carpark {
    private int id;
    private String name;
    private String address;
    private double latitude;
    private double longitude;
    private int totalLots;
    private int availableLots;
    private char vehCat;

    private float weekdayRate;
    private float satdayRate;
    private float sunPHRate;


    public Carpark(int id, String name, String address, double latitude, double longitude,
                   int totalLots, int availableLots, char vehCat, float weekdayRate,
                   float satdayRate, float sunPHRate) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.totalLots = totalLots;
        this.availableLots = availableLots;
        this.vehCat = vehCat;
        this.weekdayRate = weekdayRate;
        this.satdayRate = satdayRate;
        this.sunPHRate = sunPHRate;
    }

    /**
     * Refreshes the number of available lots
     *
     */
    public void updateAvailableLots() {
        // TODO
    }

}