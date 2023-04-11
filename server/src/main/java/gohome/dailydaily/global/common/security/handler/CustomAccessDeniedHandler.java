package gohome.dailydaily.global.common.security.handler;

import gohome.dailydaily.global.error.logging.DiscordWebhook;
import gohome.dailydaily.global.error.logging.ServerErrorLogging;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    private final ServerErrorLogging logging;
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        log.warn("{}\nAccess Denied: {}", request.getRequestURI(), accessDeniedException.getMessage());

        logging.sendToDiscord(request, accessDeniedException);
        ErrorResponder.sendErrorResponse(response, response.SC_FORBIDDEN, "Access Denied");
    }
}
