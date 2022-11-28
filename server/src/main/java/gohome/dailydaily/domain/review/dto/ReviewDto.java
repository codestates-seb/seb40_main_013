package gohome.dailydaily.domain.review.dto;

import gohome.dailydaily.domain.file.entity.File;
import lombok.*;
import org.hibernate.validator.constraints.Range;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class ReviewDto {

    @Getter
    @Setter
    public static class Post {
        @NotBlank
        private String content;
        @Range(min = 0, max = 5)
        private Float score;
        private MultipartFile img;
    }

    @Getter
    public static class Patch {
        @Positive
        private Long reviewId;
        private String content;
        private Float score;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
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
