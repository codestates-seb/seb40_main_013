package gohome.dailydaily.domain.cart.repository;

import gohome.dailydaily.domain.cart.entity.ProductCart;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductCartRepository extends JpaRepository<ProductCart, Long> {

    @EntityGraph(attributePaths = {"cart", "cart.member"})
    Optional<ProductCart> findProductCartById(Long productCartId);
}
