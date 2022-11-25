package gohome.dailydaily.domain.review.service;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.repository.ProductRepository;
import gohome.dailydaily.domain.review.entity.Review;
import gohome.dailydaily.domain.review.repository.ReviewRepository;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {

    private final MemberService memberService;
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public Review createReview(Long memberId, Long productId, Review review) {
        Member member = memberService.findVerifiedMember(memberId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
        Float score =  ((product.getScore() * product.getReviews().size()) + review.getScore()) / (product.getReviews().size() + 1);
        product.setScore(score);
        review.initInfo(member, product);
        return reviewRepository.save(review);
    }

    public Review updateReview(Long memberId, Long productId, Review review) {
        Review verifiedReview = findVerifiedReview(memberId, productId, review.getId());
        return verifiedReview.updateReview(review);
    }

    public void deleteReview(Long memberId, Long productId, Long reviewId) {
        Review verifiedReview = findVerifiedReview(memberId, productId, reviewId);
        reviewRepository.delete(verifiedReview);
    }

    @Transactional(readOnly = true)
    public Page<Review> findReviewsByMemberId(Long memberId, Pageable pageable) {
        return reviewRepository.findByMember_Id(memberId, pageable);
    }

    private Review findVerifiedReview(Long memberId, Long productId, Long reviewId) {
        Review review = reviewRepository.findReviewById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

        if (!review.getMember().getId().equals(memberId) || !review.getProduct().getId().equals(productId)) {
            throw new BusinessLogicException(ExceptionCode.ID_DOES_NOT_MATCH);
        }

        return review;
    }

}
