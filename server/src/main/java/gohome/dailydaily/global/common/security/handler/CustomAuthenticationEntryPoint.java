package gohome.dailydaily.global.common.security.handler;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
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
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");
        log.warn("{}\nUnauthorized: {}", request.getRequestURI(),
                exception == null ? authException.getMessage() : exception.getMessage());

        String message;
        if (exception == null) {
            message = "Unauthorized";
        } else if (exception instanceof SignatureException) {
            message = "JWT signature does not match";
        } else if (exception instanceof ExpiredJwtException) {
            message = "JWT expired";
        } else if (exception instanceof MalformedJwtException) {
            message = "Malformed JWT";
        } else {
            message = exception.getMessage();
        }

        ErrorResponder.sendErrorResponse(response, response.SC_UNAUTHORIZED, message);
    }
}
