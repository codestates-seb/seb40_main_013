package gohome.dailydaily.domain.order.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {

    @Getter
    public static class Post {
        private List<OrderProductDto.Post> orderProducts;

    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long orderId;
        private Long orderNumber;
        private String status;
        private List<OrderProductDto.Response> orderProducts;
        private LocalDateTime createdAt;
    }
}
