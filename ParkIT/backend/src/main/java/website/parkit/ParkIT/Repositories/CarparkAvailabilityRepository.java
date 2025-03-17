package website.parkit.ParkIT.repository;

import website.parkit.ParkIT.model.CarparkAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarparkAvailabilityRepository extends JpaRepository<CarparkAvailability, Long> {
    // Custom queries if needed
}