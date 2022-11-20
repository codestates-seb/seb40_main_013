package gohome.dailydaily.global.common.security.controller;

import gohome.dailydaily.global.common.security.dto.PasswordDto;
import gohome.dailydaily.global.common.security.dto.RefreshDto;
import gohome.dailydaily.global.common.security.resolver.MemberId;
import gohome.dailydaily.global.common.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/refresh")
    public RefreshDto refresh() {
        return new RefreshDto();
    }

    @PostMapping("/password")
    public PasswordDto.Response verifyPassword(@MemberId Long memberId, @RequestBody PasswordDto passwordDto) {
        authService.verifyPassword(memberId, passwordDto.getPassword());
        return new PasswordDto.Response();
    }

    @PostMapping("/guest")
    public void guest(HttpServletResponse response) {
        String accessToken = authService.getGuestAccessToken();
        response.setHeader("Authorization", "Bearer " + accessToken);
    }

}
