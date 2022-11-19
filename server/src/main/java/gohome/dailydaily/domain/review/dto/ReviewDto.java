package gohome.dailydaily.domain.review.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class ReviewDto {

    @Getter
    public static class Post {
        private String title;
        private String content;
        private Float score;
    }

    @Getter
    public static class Patch {
        private Long reviewId;
        private String title;
        private String content;
        private Float score;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class Response {
        private Long reviewId;
        private Long productId;
        private String productTitle;
        private String nickname;
        private String title;
        private String content;
        private Float score;
        private LocalDateTime createdAt;
    }

}
