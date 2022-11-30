package gohome.dailydaily.domain.product.dto;


import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.member.dto.MemberDto;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.review.dto.ReviewDto;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

public class ProductDto {

    @Getter
    @Setter
    public static class PostProduct {
        @NotBlank
        private Long sellerId;
        @NotBlank
        private String title;
        @NotBlank
        private List<MultipartFile> content;
        @NotBlank
        private MultipartFile img;
        @NotBlank
        private String main;
        @NotBlank
        private String sub;
        @Min(5000)
        private Integer price;
        @NotEmpty
        private List<OptionDto.post> optionList;

        public List<Option> getOptions() {
            return optionList.stream()
                    .map(post -> Option.builder()
                            .color(post.getColor())
                            .stock(post.getStock())
                            .build())
                    .collect(Collectors.toList());
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response implements Serializable {
        private Long productId;
        private String title;
        private List<String> content;
        private File img;
        private Integer price;
        private Float score;
        private MemberDto.SellerResponse seller;
        private List<OptionDto.Response> options;
        private List<ReviewDto.Response> reviews;
        private String main;
        private boolean existsLike;
    }

}
