package gohome.dailydaily.domain.order.dto;

import gohome.dailydaily.domain.file.entity.File;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class OrderProductDto {

    @Getter
    public static class Post {

        private Long productId;
        private Long optionId;
        private Integer count;
    }

    @Getter
    public static class Patch {
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class Response {

        private Long productId;
        private String brandName;
        private String title;
        private File img;
        private Integer count;
        private Integer price;
        private String color;
    }
}
