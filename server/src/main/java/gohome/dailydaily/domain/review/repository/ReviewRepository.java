package gohome.dailydaily.domain.review.repository;

import gohome.dailydaily.domain.review.entity.Review;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @EntityGraph(attributePaths = {"product", "member"})
    Optional<Review> findReviewById(Long reviewId);
    
}
