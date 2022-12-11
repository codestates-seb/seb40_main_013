package gohome.dailydaily.domain.cart.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;
import java.util.List;

public class CartDto {

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class Response implements Serializable {

        private Long cartId;
        private List<ProductCartDto.Response> productCarts;
    }

}
