package gohome.dailydaily.domain.product.service;

import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.repository.CategoryRepository;
import gohome.dailydaily.domain.product.repository.ProductRepository;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<Product> findProduct() {
        List<Product> products = productRepository.findAll();
//        for (int i=0; i< products.size(); i++){
//            SelectScoreDto s = new SelectScoreDto();
//            Product product = products.get(i);
//        }
        return products;
    }

    public Slice<CategoryGetDto> getCategoryList(Pageable pageable, String main) {
        return productRepository.findByCategory_Main(pageable, main);

    }

    public Slice<CategoryGetDto> getCategoryList(Pageable pageable, String main, String sub) {
        return productRepository.findByCategory_MainAndCategory_Sub(pageable, main, sub);
    }
}
