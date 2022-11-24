package gohome.dailydaily.domain.cart.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class CartDto {

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class Response {

        private Long cartId;
        private List<ProductCartDto.Response> productCarts;
    }

}
