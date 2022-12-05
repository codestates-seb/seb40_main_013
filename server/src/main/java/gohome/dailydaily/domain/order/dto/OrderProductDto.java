package gohome.dailydaily.domain.order.dto;

import gohome.dailydaily.domain.file.entity.File;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;
import java.time.LocalDateTime;

public class OrderProductDto {

    @Getter
    public static class Post {

        @Positive
        private Long productCartId;
        @NotNull
        @Positive
        private Long productId;
        @NotNull
        @Positive
        private Long optionId;
        @NotNull
        @Range(min = 1, max = 100)
        private Integer count;
    }

    @Getter
    public static class Patch {
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class Response implements Serializable {

        private Long productId;
        private String brandName;
        private String title;
        private File img;
        private Integer count;
        private Integer price;
        private String color;
    }
}
