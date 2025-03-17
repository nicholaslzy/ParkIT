package website.parkit.ParkIT.model;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.List;

@Entity
public class CarparkRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "carpark_no", referencedColumnName = "carparkNo")
    private Carpark carpark;

    private String ppName;  // Carpark name
    private String ppCode;  // Carpark code
    private String weekdayMin;  // Max duration for weekdays
    private String weekdayRate;  // Rate for weekdays
    private String satdayMin;  // Max duration for Saturday
    private String satdayRate;  // Rate for Saturday
    private String sunPHMin;  // Max duration for Sunday and public holidays
    private String sunPHRate;  // Rate for Sunday and public holidays
    private String parkingSystem;  // "C" or "B" (Coupon or Electronic Parking System)
    private int parkCapacity;  // Capacity of the carpark
    private String vehCat;  // Vehicle category (e.g., "Car", "M")

    @ElementCollection
    private List<String> coordinates;  // Coordinates in SVY21 format

    private LocalTime startTime;  // Start time of rate
    private LocalTime endTime;  // End time of rate

    // Getters and Setters
}
