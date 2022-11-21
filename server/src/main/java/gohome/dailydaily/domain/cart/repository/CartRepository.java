package gohome.dailydaily.domain.cart.repository;

import gohome.dailydaily.domain.cart.entity.Cart;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @EntityGraph(attributePaths = {"productCarts", "productCarts.product", "productCarts.product.seller.member", "productCarts.option"})
    Optional<Cart> findCartByMember_Id(Long memberId);
}
