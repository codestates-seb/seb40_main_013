package gohome.dailydaily.domain.cart.repository;

import gohome.dailydaily.domain.cart.entity.Cart;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @EntityGraph(attributePaths = {"member"})
    Optional<Cart> findByMemberMemberId(Long memberId);
}
