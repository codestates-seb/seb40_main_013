package gohome.dailydaily.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXIST(409, "Member exists"),
    ORDER_NOT_FOUND(404, "Order not found"),
    CANNOT_CHANGE_ORDER(403, "Order can not change"),
    PRODUCT_NOT_FOUND(404, "Product not found"),

    EMAIL_ALREADY_EXISTS(409, "Email already exist"),
    NICKNAME_ALREADY_EXISTS(409, "Nickname already exist"),

    ;

    private final int status;
    private final String message;
}
