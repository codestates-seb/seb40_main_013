package gohome.dailydaily.domain.review.mapper;

import gohome.dailydaily.domain.review.dto.ReviewDto;
import gohome.dailydaily.domain.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {

    @Mapping(target = "score", expression = "java((int) (post.getScore() * 10))")
    Review toReview(ReviewDto.Post post);

    @Mapping(target = "score", expression = "java((int) (patch.getScore() * 10))")
    Review toReview(ReviewDto.Patch patch, Long id);

    @Mapping(target = "reviewId", source = "id")
    @Mapping(target = "score", expression = "java(review.getScore() / 10F)")
    ReviewDto.Response toResponse(Review review);
}
