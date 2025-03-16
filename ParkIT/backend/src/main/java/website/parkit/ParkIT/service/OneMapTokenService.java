package website.parkit.ParkIT.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;


 /* OneMapTokenService
 * -------------------
 * - Context: The OneMap API access token needs to be refreshed every 72 hours
 * 
 * - This service is responsible for communicating with the OneMap API to obtain an access token,
 *   tracking its expiry, and refreshing it as needed.
 *
 * - Token Refresh
 *   refreshToken() sends an HTTP POST request to the OneMap token endpoint using the credentials
 *   (email and password). It parses the response to extract the access token and stores it.
 * 
 * - Token Retrieval
 *   getToken() returns the current token. If the token is expired or not set, it triggers a refresh.
 *   getAndRefreshToken() refreshes the token and returns it.
 *
 * - Configuration
 *   The API credentials are injected from environment variables. Make sure to set the environment variables before running
 */

 @Service
public class OneMapTokenService {

    @Value("${onemap.api.email}")
    private String clientEmail;

    @Value("${onemap.api.password}")
    private String clientPassword;

    private String token;
    private final String tokenUrl = "https://www.onemap.gov.sg/api/auth/post/getToken";
    private final RestTemplate restTemplate;

    public OneMapTokenService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
        refreshToken(); // fetch token on startup
    }

    public void refreshToken() {
        try {
            // Create a Map for the request body
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("email", clientEmail);
            requestBody.put("password", clientPassword);

            // Set headers for JSON
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Create the request entity with the JSON body
            HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

            // Make the POST request
            ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, requestEntity, String.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                // Parse the JSON to extract access_token
                ObjectMapper mapper = new ObjectMapper();
                Map<String, Object> responseMap = mapper.readValue(response.getBody(), new TypeReference<Map<String, Object>>() {});

                this.token = (String) responseMap.get("access_token");
                System.out.println("OneMap API Response: " + response.getBody());
            } else {
                System.err.println("Failed to refresh token. HTTP Status: " + response.getStatusCode());
            }

        } catch (Exception ex) {
            System.err.println("Error refreshing token: " + ex.getMessage());
        }
    }
    
    public String getToken() {
        if (token == null) {
            refreshToken();
        }
        return token;
    }

    public String getAndRefreshToken() {
        refreshToken();
        return token;
    }
    
}