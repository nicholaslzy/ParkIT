package website.parkit.ParkIT.service;

import website.parkit.ParkIT.model.Carpark;
import website.parkit.ParkIT.repository.CarparkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.json.JSONObject;

@Service
public class CarparkService {

    @Autowired
    private CarparkRepository carparkRepository;

    @Autowired
    private URATokenService uraTokenService;

    private final RestTemplate restTemplate = new RestTemplate();

    public void fetchCarparkDetails() {
        String token = uraTokenService.getToken();
        String url = "https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=Car_Park_Details";

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

            // Create the carpark model
            Carpark carparkModel = new Carpark(
                    carpark.getInt("id"),
                    carpark.getString("ppName"),
                    carpark.getString("address"),
                    latitude,
                    longitude,
                    carpark.getInt("parkCapacity"),
                    carpark.getInt("availableLots"),
                    carpark.getString("vehCat").charAt(0),
                    Float.parseFloat(carpark.getString("weekdayRate").replace("$", "")),
                    Float.parseFloat(carpark.getString("satdayRate").replace("$", "")),
                    Float.parseFloat(carpark.getString("sunPHRate").replace("$", ""))
            );

            carparkRepository.save(carparkModel);
        }
    }

    // Dummy conversion method, use a proper SVY21 to WGS84 conversion logic
    private double[] convertSVY21toWGS84(double svy21X, double svy21Y) {
        // Replace with actual conversion logic
        // For now, just returning dummy data
        return new double[] { svy21X / 1000, svy21Y / 1000 }; // Dummy conversion
    }
}
