package gohome.dailydaily.global.common.security.handler;

import com.google.gson.Gson;
import gohome.dailydaily.global.error.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.valueOf(status), message);

        response.setStatus(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
