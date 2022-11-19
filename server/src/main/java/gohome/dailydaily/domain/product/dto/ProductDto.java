package gohome.dailydaily.domain.product.dto;

import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.member.dto.MemberDto;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.review.dto.ReviewDto;
import gohome.dailydaily.domain.review.entity.Review;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

public class ProductDto {

    @Getter
    public static class PostProduct {
        private Long sellerId;
        private String title;
        private String content;
        private MultipartFile img;
        private List<CategoryDto> categoryList;
        private Integer price;
        private List<OptionDto> optionList;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class Response {
        private Long productId;
        private String title;
        private String content;
        private File img;
        private Integer price;
        private Float score;
        private MemberDto.SellerResponse seller;
        private List<OptionDto.Response> options;
        private List<ReviewDto.Response> reviews;
    }

}