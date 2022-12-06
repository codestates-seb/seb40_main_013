package gohome.dailydaily.global.common.security.handler;

import gohome.dailydaily.global.error.logging.ServerErrorLogging;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final ServerErrorLogging logging;
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        log.warn("{}\nUnauthorized: {}", request.getRequestURI(), authException.getMessage());

        logging.sendToDiscord(request, authException);
        ErrorResponder.sendErrorResponse(response, response.SC_UNAUTHORIZED, "Unauthorized");
    }
}
