package gohome.dailydaily.domain.cart.dto;

import gohome.dailydaily.domain.file.entity.File;
import lombok.*;

import java.io.Serializable;

public class ProductCartDto {

    @Getter
    public static class Post {

        private Long productId;
        private Integer count;
        private Long optionId;

    }
    @Getter
    public static class Patch {
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
