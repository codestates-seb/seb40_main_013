package gohome.dailydaily.domain.product.repository;

import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Slice<CategoryGetDto> findByCategory_Main(Pageable pageable, String main);

    Slice<CategoryGetDto> findByCategory_MainAndCategory_Sub(Pageable pageable, String main, String sub);

    //Optional<ProductDto.ProductGetDto> findById(Long productId);
    @EntityGraph(attributePaths = {"seller", "seller.member", "seller.member.cart", "reviews"})
    Optional<Product> findProductById(Long productId);
}
