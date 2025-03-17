package website.parkit.ParkIT.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class CarparkAvailability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "carpark_no", referencedColumnName = "carparkNo")
    private Carpark carpark;

    private int availableLots;  // Number of available parking lots
    private String lotType;  // "C", "M", "H" (Car, Motorcycle, Heavy Vehicle)

    @ElementCollection
    private List<String> coordinates;  // Coordinates in SVY21 format

    private LocalDateTime updatedAt;  // Last updated timestamp

    // Getters and Setters
}
