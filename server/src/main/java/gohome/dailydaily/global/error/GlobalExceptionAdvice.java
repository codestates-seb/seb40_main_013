package gohome.dailydaily.global.error;

import javax.validation.ConstraintViolationException;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


/*
* Controller 클래스에서 발생하는 예외들을 공통으로 처리하는 클래스
* */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {

    // RequestBody 의 유효성 검증 에러인 MethodArgumentNotValidException 처리하는 메서드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        final ErrorResponse response = ErrorResponse.of(e.getBindingResult());

        return response;
    }

    // URI 변수로 넘어오는 값의 유효성 검증 에러인 ConstraintViolationException 처리하는 메서드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {

        final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());

        return response;
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

        final ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);

        return response;
    }

    // HttpMessageNotReadableException 을 처리하기 위한 메서드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleHttpMessageNotReadableException (HttpMessageNotReadableException e) {

        final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST,
                "Required request body is missing");

        return response;
    }

    // MissingServletRequestParameterException 을 처리하기 위한 메서드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMissingServletRequestParameterException (MissingServletRequestParameterException e) {

        final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());

        return response;
    }


    // 코드 상의 문제로 발생하는 Exception 을 처리하기 위한 메서드
    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleException(Exception e) {
        log.error("# handle Exception", e);

        final ErrorResponse response = ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);

        return response;
    }
}