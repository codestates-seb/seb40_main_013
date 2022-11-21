package gohome.dailydaily.domain.review.dto;

import gohome.dailydaily.domain.file.entity.File;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class ReviewDto {

    @Getter
    public static class Post {
        @NotBlank
        private String content;
        @Range(min = 0, max = 5)
        private Float score;
    }

    @Getter
    public static class Patch {
        @Positive
        private Long reviewId;
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
        private String content;
        private Float score;
        private File img;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

}
