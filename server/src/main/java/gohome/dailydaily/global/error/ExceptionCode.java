package gohome.dailydaily.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionCode {
    ID_DOES_NOT_MATCH(400, "ID does not match"),
    PASSWORD_DOES_NOT_MATCH(400, "Password does not match"),
    ORDER_DOES_NOT_MATCH(400, "Order does not match"),

    CANNOT_CHANGE_ORDER(403, "Order can not change"),
    CANNOT_CANCEL_ORDER(403, "Order can not cancel"),
    OUT_OF_STOCK(403, "Out of stock"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    CART_NOT_FOUND(404, "Cart not found"),
    ORDER_NOT_FOUND(404, "Order not found"),
    OPTION_NOT_FOUND(404, "Option not found"),
    PRODUCT_NOT_FOUND(404, "Product not found"),
    REVIEW_NOT_FOUND(404, "Review not found"),
    LIKE_NOT_FOUND(404, "Like not found"),
    PRODUCT_CART_NOT_FOUND(404, "Product not found in cart"),
    TOKEN_NOT_FOUND(404, "Token not found"),

    CATEGORY_NOT_FOUND(404, "Category not found"),
    TITLE_NOT_BLANK(400, "Title Not Blank"),
    EMAIL_ALREADY_EXISTS(409, "Email already exist"),
    NICKNAME_ALREADY_EXISTS(409, "Nickname already exist"),
    MEMBER_EXIST(409, "Member exists"),
    LIKE_EXISTS(409, "Like already exist");

    private final int status;
    private final String message;
}
