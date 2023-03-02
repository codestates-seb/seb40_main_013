package gohome.dailydaily.domain.product.repository;

import gohome.dailydaily.domain.product.entity.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom {

    @EntityGraph(attributePaths = {"seller", "seller.member", "seller.member.cart", "reviews","category"})
    Optional<Product> findProductById(Long productId);

}
