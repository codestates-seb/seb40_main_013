package gohome.dailydaily.domain.product.dto;


import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.member.dto.MemberDto;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.review.dto.ReviewDto;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

public class ProductDto {

    @Getter
    @Setter
    public static class PostProduct {
        private Long sellerId;
        private String title;
        private List<MultipartFile> content;
        private MultipartFile img;
        private String main;
        private String sub;
        private Integer price;
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
    public static class Response {
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
