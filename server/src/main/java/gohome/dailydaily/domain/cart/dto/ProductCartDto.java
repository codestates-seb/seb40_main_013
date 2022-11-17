package gohome.dailydaily.domain.cart.dto;

import gohome.dailydaily.domain.file.entity.File;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class ProductCartDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        private Long productId;
        private Integer count;
        private Long optionId;
    }



    @Getter
    @AllArgsConstructor
    public static class Response {

        private Long productId;
        private File img;
        private String title;
        private Integer count;
        private Integer price;
    }
}
