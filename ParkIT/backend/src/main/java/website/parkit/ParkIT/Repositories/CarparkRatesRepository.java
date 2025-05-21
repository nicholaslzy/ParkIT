package website.parkit.ParkIT.repository;

import website.parkit.ParkIT.model.CarparkRate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarparkRatesRepository extends JpaRepository<CarparkRate, Long> {
    // Custom queries if needed
}