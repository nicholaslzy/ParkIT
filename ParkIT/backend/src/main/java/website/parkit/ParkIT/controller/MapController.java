package website.parkit.ParkIT.controller;

import website.parkit.ParkIT.service.OneMapTokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/*   MapController
 *   -------------------
 * - This controller exposes an HTTP endpoint that allows the front end to retrieve the OneMap API token
 *
 *   GET /api/onemap/token - Retrieve the current token
 *   GET /api/onemap/token?forceRefresh=true - Force a token refresh before returning it
 */

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/onemap")
public class MapController {

    private final OneMapTokenService tokenService;

    public MapController(OneMapTokenService tokenService) {
        this.tokenService = tokenService;
    }

    @GetMapping("/token")
    public ResponseEntity<String> getToken(
            @RequestParam(value = "forceRefresh", defaultValue = "false") boolean forceRefresh) {
        String accessToken;
        if (forceRefresh) {
            accessToken = tokenService.getAndRefreshToken();
        } else {
            accessToken = tokenService.getToken();
        }
        return ResponseEntity.ok(accessToken);
    }
}