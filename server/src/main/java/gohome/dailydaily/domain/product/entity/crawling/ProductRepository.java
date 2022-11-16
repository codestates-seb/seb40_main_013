package gohome.dailydaily.domain.product.entity.crawling;

import gohome.dailydaily.domain.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductVO, Long> {

}
