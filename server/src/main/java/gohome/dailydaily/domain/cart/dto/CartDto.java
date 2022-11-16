package gohome.dailydaily.domain.cart.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

public class CartDto {

    @Getter
    public static class Post {
        private Long memberId;
        private List<ProductCartDto> productCarts;

    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long cartId;
        private Long memberId;
        private List<ProductCartDto.Response> productCarts;

    }

}
