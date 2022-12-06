package gohome.dailydaily.global.error;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.stream.Collectors;


/*
 * Controller 클래스에서 발생하는 예외들을 공통으로 처리하는 클래스
 * */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {

    @Value("${webhook.error}")
    private String url;

    // RequestBody 의 유효성 검증 에러인 MethodArgumentNotValidException 처리하는 메서드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        return ErrorResponse.of(e.getBindingResult());
    }

    // URI 변수로 넘어오는 값의 유효성 검증 에러인 ConstraintViolationException 처리하는 메서드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {
        return ErrorResponse.of(e.getConstraintViolations());
    }

    // 서비스 계층에서 던진 BusinessLogicException 을 Exception Advice 에서 처리
    @ExceptionHandler
    public ResponseEntity handleResourceNotFoundException(BusinessLogicException e) {

        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    // HttpRequestMethodNotSupportedException 을 처리하기 위한 메서드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        return ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);
    }

    // HttpMessageNotReadableException 을 처리하기 위한 메서드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        return ErrorResponse.of(HttpStatus.BAD_REQUEST, "Required request body is missing");
    }

    // MissingServletRequestParameterException 을 처리하기 위한 메서드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        return ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());
    }


    // 코드 상의 문제로 발생하는 Exception 을 처리하기 위한 메서드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleException(HttpServletRequest request, Exception e,
                                         @AuthenticationPrincipal Long memberId) throws IOException {
        log.error("# handle Exception", e);

        // 디스코드 webhook 으로 로그 전송
        DiscordWebhook webhook = new DiscordWebhook(url);
        webhook.setContent(e.getMessage());

        DiscordWebhook.EmbedObject errorObject = new DiscordWebhook.EmbedObject();

        String parameterMap = request.getParameterMap().entrySet().stream()
                .map(entry -> String.join("=", entry.getKey(), Arrays.toString(entry.getValue())))
                .collect(Collectors.joining(", "));

        webhook.addEmbed(errorObject
                        .addField("URI", request.getRequestURI(), false)
                        .addField("ParameterMap", parameterMap, false)
                        .addField("유저 아이디", String.valueOf(memberId), false)
                        .addField("IP", getIp(request), false)
                        .addField("예외 타입", String.valueOf(e.getClass()), false)
                        .addField("에러 메시지", e.getMessage(), false)
                        .addField("발생 시간", String.valueOf(LocalDateTime.now()), false));

        webhook.execute();

        return ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
    }

    public String getIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");

        if (checkIp(ip))
            ip = request.getHeader("Proxy-Client-IP");
        if (checkIp(ip))
            ip = request.getHeader("WL-Proxy-Client-IP");
        if (checkIp(ip))
            ip = request.getHeader("HTTP_CLIENT_IP");
        if (checkIp(ip))
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        if (checkIp(ip))
            ip = request.getHeader("X-Real-IP");
        if (checkIp(ip))
            ip = request.getHeader("X-RealIP");
        if (checkIp(ip))
            ip = request.getHeader("REMOTE_ADDR");
        if (checkIp(ip))
            ip = request.getRemoteAddr();

        return ip;
    }

    public boolean checkIp(String ip) {
        return ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip);
    }
}
