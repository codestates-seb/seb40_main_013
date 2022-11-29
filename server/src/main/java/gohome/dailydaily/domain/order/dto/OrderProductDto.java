package gohome.dailydaily.domain.order.dto;

import gohome.dailydaily.domain.file.entity.File;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;

public class OrderProductDto {

    @Getter
    public static class Post {

        private Long productCartId;
        @NotNull
        private Long productId;
        @NotNull
        private Long optionId;
        @NotNull
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
