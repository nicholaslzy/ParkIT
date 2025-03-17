package website.parkit.ParkIT.service;

import website.parkit.ParkIT.model.CarparkAvailability;
import website.parkit.ParkIT.repository.CarparkAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.json.JSONObject;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CarparkAvailabilityService {

    @Autowired
    private CarparkAvailabilityRepository availabilityRepository;

    @Autowired
    private URATokenService uraTokenService;

    private final RestTemplate restTemplate = new RestTemplate();

    public void fetchCarparkAvailability() {
        String token = uraTokenService.getToken();
        String url = "https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=Car_Park_Availability";

        HttpHeaders headers = new HttpHeaders();
        headers.set("AccessKey", uraTokenService.getAccessKey());
        headers.set("Token", token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        JSONObject jsonResponse = new JSONObject(response.getBody());
        JSONArray carparks = jsonResponse.getJSONArray("Result");

        for (int i = 0; i < carparks.length(); i++) {
            JSONObject carpark = carparks.getJSONObject(i);

            // Convert SVY21 coordinates to WGS84 (latitude and longitude)
            JSONArray geometries = carpark.getJSONArray("geometries");
            double latitude = 0;
            double longitude = 0;
            for (int j = 0; j < geometries.length(); j++) {
                JSONObject geometry = geometries.getJSONObject(j);
                String[] coordinates = geometry.getString("coordinates").split(",");
                double svy21X = Double.parseDouble(coordinates[0]);
                double svy21Y = Double.parseDouble(coordinates[1]);

                // Convert SVY21 to WGS84 (you can use a conversion method or library here)
                double[] wgs84Coordinates = convertSVY21toWGS84(svy21X, svy21Y);
                latitude = wgs84Coordinates[0];
                longitude = wgs84Coordinates[1];
            }

            // Create the availability object
            CarparkAvailability availability = new CarparkAvailability();
            availability.setAvailableLots(carpark.getInt("lotsAvailable"));
            availability.setLotType(carpark.getString("lotType"));
            availability.setUpdatedAt(LocalDateTime.now());
            availability.setCoordinates(List.of(latitude, longitude)); // Store as WGS84 coordinates

            availabilityRepository.save(availability);
        }
    }

    // Dummy conversion method, use a proper SVY21 to WGS84 conversion logic
    private double[] convertSVY21toWGS84(double svy21X, double svy21Y) {
        // Replace with actual conversion logic
        return new double[] { svy21X / 1000, svy21Y / 1000 }; // Dummy conversion
    }
}
