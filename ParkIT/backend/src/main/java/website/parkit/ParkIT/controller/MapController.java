package website.parkit.ParkIT.controller;

import website.parkit.ParkIT.service.OneMapTokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/*   Purpose
 * - This controller exposes an HTTP endpoint that allows the front end (or any other consumer) to retrieve
 *   the current OneMap token details.
 *
 * - Endpoint Exposure
 *   The controller maps the "/api/onemap/token" endpoint using @RestController and @RequestMapping. When this
 *   endpoint is called, the controller delegates the retrieval of the token to the OneMapTokenService.
 *
 * - Response Delivery
 *   It wraps the token (and any additional details such as expiry information) in a ResponseEntity and returns it
 *   to the client. This allows the front end to receive a valid token for subsequent API calls to OneMap.
 *
 * Overall Flow
 * 1. On application startup, OneMapTokenService initializes by fetching the token (via @PostConstruct) and
 *    schedules regular refreshes.
 * 2. When the front end calls the "/api/onemap/token" endpoint, the controller returns the current token details.
 * 3. The service ensures that if the token is expired or about to expire, it will be refreshed, so the client
 *    always receives a valid token.
 */

@RestController
@RequestMapping("/api/onemap")
public class MapController {

    private final OneMapTokenService tokenService;

    public MapController(OneMapTokenService tokenService) {
        this.tokenService = tokenService;
    }

    @GetMapping("/token")
    public ResponseEntity<Map<String, Object>> getToken() {
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", tokenService.getToken());
        return ResponseEntity.ok(response);
    }
}