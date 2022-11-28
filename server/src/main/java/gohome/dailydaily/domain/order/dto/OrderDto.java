package gohome.dailydaily.domain.order.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {

    @Getter
    public static class Post {
        private List<OrderProductDto.Post> orderProducts;

    }

    @Getter
    @AllArgsConstructor
    public static class Response implements Serializable {
        private Long orderId;
        private Long orderNumber;
        private String status;
        private List<OrderProductDto.Response> orderProducts;
        private LocalDateTime createdAt;
    }
}
