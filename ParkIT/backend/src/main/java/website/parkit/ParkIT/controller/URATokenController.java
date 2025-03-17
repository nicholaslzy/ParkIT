package website.parkit.ParkIT.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import website.parkit.ParkIT.service.URATokenService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class URATokenController {

    @Autowired
    private URATokenService uraTokenService;

    @GetMapping("/token")
    public ResponseEntity<Map<String, String>> getToken() {
        String token = uraTokenService.getToken();
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }
}