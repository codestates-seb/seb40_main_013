package gohome.dailydaily.domain.cart.dto;

import gohome.dailydaily.domain.file.entity.File;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;

public class ProductCartDto {

    @Getter
    public static class Post {
        @NotNull
        @Positive
        private Long productId;
        @NotNull
        @Range(min = 1, max = 100)
        private Integer count;
        @NotNull
        @Positive
        private Long optionId;

    }
    @Getter
    public static class Patch {
        @NotNull
        @Range(min = 1, max = 100)
        private Integer count;

    }
    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class Response implements Serializable {

        private Long productCartId;
        private Long productId;
        private File img;
        private String brandName;
        private String title;
        private Integer count;
        private Integer price;
        private Long optionId;
        private String color;
    }
}
