package gohome.dailydaily.global.common.security.controller;

import gohome.dailydaily.global.common.security.dto.RefreshDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RefreshController {

    @PostMapping("/refresh")
    public RefreshDto refresh() {
        return new RefreshDto();
    }
}
