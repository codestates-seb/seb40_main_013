package gohome.dailydaily.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionCode {
    ID_DOES_NOT_MATCH(400, "ID does not match"),

    CANNOT_CHANGE_ORDER(403, "Order can not change"),

    MEMBER_NOT_FOUND(404, "Member not found"),
    CART_NOT_FOUND(404, "Cart not found"),
    ORDER_NOT_FOUND(404, "Order not found"),
    OPTION_NOT_FOUND(404, "Option not found"),
    PRODUCT_NOT_FOUND(404, "Product not found"),
    REVIEW_NOT_FOUND(404, "Review not found"),

    CATEGORY_NOT_FOUND(404, "Category not found"),

    EMAIL_ALREADY_EXISTS(409, "Email already exist"),
    NICKNAME_ALREADY_EXISTS(409, "Nickname already exist"),
    MEMBER_EXIST(409, "Member exists");

    private final int status;
    private final String message;
}
