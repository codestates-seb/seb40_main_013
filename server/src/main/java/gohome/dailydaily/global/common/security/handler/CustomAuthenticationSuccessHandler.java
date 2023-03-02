package gohome.dailydaily.global.common.security.handler;

import gohome.dailydaily.domain.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        log.info("{}\nAuthenticated successfully: {}", request.getRequestURI(),
                ((Member) authentication.getPrincipal()).getEmail());
        ErrorResponder.sendErrorResponse(response, response.SC_OK, "Authenticated successfully");
    }
}
