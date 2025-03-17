package website.parkit.ParkIT.repository;

import website.parkit.ParkIT.model.Carpark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarparkRepository extends JpaRepository<Carpark, String> {
    // Custom queries if needed
}