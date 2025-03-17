package website.parkit.ParkIT.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;
import java.time.LocalDateTime;
import java.util.logging.Logger;

@Service
public class URATokenService {
    private static final String ACCESS_KEY = "4c2872d7-b050-4a3c-8f03-aaef63d80051";
    private static final String TOKEN_API_URL = "https://eservice.ura.gov.sg/uraDataService/insertNewToken/v1";

    private String token;
    private LocalDateTime tokenExpiry;
    private final RestTemplate restTemplate = new RestTemplate();
    private static final Logger LOGGER = Logger.getLogger(URATokenService.class.getName());

    public String getAccessKey() {
        return ACCESS_KEY;
    }

    public String getToken() {
        if (token == null || tokenExpiry == null || LocalDateTime.now().isAfter(tokenExpiry)) {
            refreshToken();
        }
        return token;
    }

    private void refreshToken() {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("AccessKey", ACCESS_KEY);
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(TOKEN_API_URL, HttpMethod.GET, entity, String.class);

            JSONObject jsonResponse = new JSONObject(response.getBody());
            if (jsonResponse.has("Result")) {
                this.token = jsonResponse.getString("Result");
                this.tokenExpiry = LocalDateTime.now().plusHours(24);
                LOGGER.info("New URA token retrieved successfully.");
            }
        } catch (Exception e) {
            LOGGER.severe("Failed to retrieve URA token: " + e.getMessage());
        }
    }
}
