package gohome.dailydaily.domain.cart.dto;

import gohome.dailydaily.domain.file.entity.File;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class ProductCartDto {

    @Getter
    public static class Post {

        private Long productId;
        private Integer count;
        private Long optionId;

    }
    @Getter
    public class Patch {
        private Long productCartId;
        private Integer count;

    }
    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class Response {

        private Long productCartId;
        private Long productId;
        private File img;
        private String brandName;
        private String title;
        private Integer count;

        private Integer price;
    }
}
