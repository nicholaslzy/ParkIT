package website.parkit.ParkIT.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

 /* OneMapTokenService
 * -------------------
 * - Context: The OneMap API access token needs to be refreshed every 72 hours
 * 
 * - This service is responsible for communicating with the OneMap API to obtain an access token,
 *   tracking its expiry, and refreshing it as needed.
 *
 * - Token Retrieval
 *   getToken() returns the current token. If the token is expired or not set, it triggers a refresh.
 *
 * - Token Refresh:
 *   refreshToken() sends an HTTP POST request to the OneMap token endpoint using the credentials
 *   (email and password). It parses the response to extract the access token and its expiration duration
 *   (provided as "expires_in" in seconds) and calculates the absolute expiry time.
 *
 * - Usage:
 *   Instead of a scheduled refresh, the token is refreshed on-demand—typically when an API call
 *   returns a 401 error
 *
 * - Configuration:
 *   The token endpoint URL, API credentials, etc. are injected from application properties or environment variables.
 */

 @Service
public class OneMapTokenService {

    @Value("${onemap.base.url}")
    private String tokenUrl;

    @Value("${onemap.api.email}")
    private String clientEmail;

    @Value("${onemap.api.password}")
    private String clientPassword;

    private String token;
    private long expiryTime; // token expiry timestamp in milliseconds

    private final RestTemplate restTemplate;

    public OneMapTokenService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
        refreshToken(); // fetch token on startup
    }

    public void refreshToken() {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("email", clientEmail);
        params.add("password", clientPassword);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, requestEntity, String.class);
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                Map<String, Object> responseMap = mapper.readValue(response.getBody(), Map.class);
                this.token = (String) responseMap.get("access_token");
                Number expiresIn = (Number) responseMap.get("expires_in");
                this.expiryTime = System.currentTimeMillis() + expiresIn.longValue() * 1000;
            } catch (Exception ex) {
                System.err.println("Error parsing token response: " + ex.getMessage());
            }
        } else {
            System.err.println("Failed to refresh token. HTTP Status: " + response.getStatusCode());
        }
    }

    public String getToken() {
        // Refresh token if not set or expired
        if (token == null || System.currentTimeMillis() >= expiryTime) {
            refreshToken();
        }
        return token;
    }
    
}