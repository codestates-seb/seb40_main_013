package gohome.dailydaily.global.error;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;


import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.ConstraintViolation;

@Getter
// Error 응답 메시지로 전달할 내용
public class ErrorResponse {

    private int status;
    private String message;
    private ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }
    private List<FieldError> fieldErrors;
    private List<ConstraintViolationError> violationErrors;

    private ErrorResponse(final List<FieldError> fieldErrors,
                          final List<ConstraintViolationError> violationErrors) {
        this.fieldErrors = fieldErrors;
        this.violationErrors = violationErrors;
    }

    // MethodArgumentNotValidException 으로 발생하는 에러 정보를 담는 멤버 변수
    public static ErrorResponse of(BindingResult bindingResult) {
        return new ErrorResponse(FieldError.of(bindingResult), null);
    }

    // ConstraintViolationException 으로부터 발생하는 에러 정보를 담는 멤버 변수
    public static ErrorResponse of(Set<ConstraintViolation<?>> violations) {
        return new ErrorResponse(null, ConstraintViolationError.of(violations));
    }

    // BusinessLogicException 에서 에러 정보를 얻기 위해 필요한 ExceptionCode 객체 생성
    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    // HttpRequestMethodNotSupportedException 의 HttpStatus 를 전달하기 위한 객체 생성
    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    // MissingServletRequestParameterException 을 처리하기 위한 응답 객체 생성
    public static ErrorResponse of(HttpStatus httpStatus, String message) {
        return new ErrorResponse(httpStatus.value(), message);
    }

    /*
    * MethodArgumentNotValidException Error 메시지
    * DTO 멤버 변수 필드의 유효성 검증 실패로 발생한 에러 정보를 담는 멤버 변수
    * */
    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class FieldError {
        private String field;

        private Object rejectedValue;
        private String reason;

        public static List<FieldError> of(BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrors = bindingResult.getFieldErrors();

            return fieldErrors.stream()
                    .map(error -> new FieldError(
                            error.getField(),
                            error.getRejectedValue() == null ?
                                    "" : error.getRejectedValue().toString(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }

    /*
    * ConstraintViolation Error 메시지
    * URI 변수 값의 유효성 검증에 실패로 발생한 에러 정보를 담는 변수
    * */
    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations) {

            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()
                    )).collect(Collectors.toList());
        }
    }
}
