package gohome.dailydaily.domain.review.mapper;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.review.dto.ReviewDto;
import gohome.dailydaily.domain.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        imports = {Member.class, Product.class})
public interface ReviewMapper {

    @Mapping(target = "score", expression = "java((int) (post.getScore() * 10))")
    @Mapping(target = "member", expression = "java(Member.builder().id(memberId).build())")
    @Mapping(target = "product", expression = "java(Product.builder().id(productId).build())")
    Review toReview(ReviewDto.Post post, Long memberId, Long productId);

    @Mapping(target = "score", expression = "java((int) (patch.getScore() * 10))")
    Review toReview(ReviewDto.Patch patch, Long id);

    @Mapping(target = "reviewId", source = "id")
    @Mapping(target = "score", expression = "java(review.getScore() / 10F)")
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productTitle", source = "product.title")
    @Mapping(target = "nickname", source = "member.nickname")
    ReviewDto.Response toResponse(Review review);
}
