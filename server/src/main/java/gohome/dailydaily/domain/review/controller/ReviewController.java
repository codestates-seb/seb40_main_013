package gohome.dailydaily.domain.review.controller;

import gohome.dailydaily.domain.review.dto.ReviewDto;
import gohome.dailydaily.domain.review.entity.Review;
import gohome.dailydaily.domain.review.mapper.ReviewMapper;
import gohome.dailydaily.domain.review.service.ReviewService;
import gohome.dailydaily.global.common.security.resolver.MemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/products/{product-id}/reviews")
public class ReviewController {

    private final ReviewMapper reviewMapper;
    private final ReviewService reviewService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @CacheEvict(key = "#memberId", value = "getReview")
    public ReviewDto.Response postReview(@MemberId Long memberId,
                                         @Positive @PathVariable("product-id") Long productId,
                                         @Valid @ModelAttribute ReviewDto.Post post) throws IOException {
        Review review = reviewService.createReview(
                reviewMapper.toReview(post, memberId, productId), post.getImg()
        );
        return reviewMapper.toResponse(review);
    }

    @PatchMapping("/{review-id}")
    @CacheEvict(key = "#memberId", value = "getReview")
    public ReviewDto.Response patchReview(@MemberId Long memberId,
                                          @Positive @PathVariable("product-id") Long productId,
                                          @Positive @PathVariable("review-id") Long reviewId,
                                          @Valid @RequestBody ReviewDto.Patch patch) {
        Review review = reviewService.updateReview(memberId, productId, reviewMapper.toReview(patch, reviewId));
        return reviewMapper.toResponse(review);
    }

    @DeleteMapping("/{review-id}")
    @CacheEvict(key = "#memberId", value = "getReview")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReview(@MemberId Long memberId,
                             @Positive @PathVariable("product-id") Long productId,
                             @Positive @PathVariable("review-id") Long reviewId) {
        reviewService.deleteReview(memberId, productId, reviewId);
    }

}


