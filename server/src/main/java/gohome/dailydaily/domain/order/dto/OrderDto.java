package gohome.dailydaily.domain.order.dto;

import gohome.dailydaily.domain.order.entity.OrderStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class OrderDto {

    @Getter
    public static class Post {
        private List<OrderProductDto.Post> orderProducts;

    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class Response {
        private Long orderId;
        private OrderStatus status;
        private List<OrderProductDto.Response> orderProducts;
    }
}
