package gohome.dailydaily.domain.product.repository;

import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface ProductRepository extends JpaRepository<Product, String> {

    List<Product> findAllBy();

    Slice<CategoryGetDto> findProductByCategory_Id(Pageable pageable, long category_id);

}
