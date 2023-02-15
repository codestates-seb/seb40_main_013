package gohome.dailydaily.global.common.security.handler;

import gohome.dailydaily.global.error.logging.ServerErrorLogging;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    private final ServerErrorLogging logging;
    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        log.warn("{}\nAuthentication failed: {}", request.getRequestURI(), exception.getMessage());

        logging.sendToDiscord(request, exception);
        ErrorResponder.sendErrorResponse(response, response.SC_UNAUTHORIZED, exception.getMessage());
    }
}
