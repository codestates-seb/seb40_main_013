package gohome.dailydaily.domain.like.repository;

import gohome.dailydaily.domain.like.entity.Like;
import gohome.dailydaily.domain.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByMember_IdAndProduct_Id(Long memberId, Long productId);

    @EntityGraph(attributePaths = "product")
    Page<Like> findLikeByMember_Id(Long memberId, Pageable pageable);

    Boolean existsByMember_IdAndProduct_Id(Long memberId, Long productId);
}
