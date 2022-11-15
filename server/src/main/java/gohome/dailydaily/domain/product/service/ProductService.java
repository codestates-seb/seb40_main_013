package gohome.dailydaily.domain.product.service;

import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.repository.CategoryRepository;
import gohome.dailydaily.domain.product.repository.ProductRepository;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<Product> findProduct() {
        List<Product> products = productRepository.findAllBy();
//        for (int i=0; i< products.size(); i++){
//            SelectScoreDto s = new SelectScoreDto();
//            Product product = products.get(i);
//        }
        return products;
    }

    public Slice<CategoryGetDto> getCategoryList(int page, int size, String main) {
        List<Long> categoryIdList = categoryRepository.findByMainEquals(main);
        if(categoryIdList.size() <= 0){
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }
        // 현재 대분류에 해당되는 소분류 여러가지를 하나의 Slice에 추가하는 방법 찾아야함
        Slice<CategoryGetDto> products =productRepository.findProductByCategory_Id(PageRequest.of(page,size, Sort.by("score").descending()), categoryIdList.get(0));
        // 추가 구현 필요
//        for(int i=1; i<categoryIdList.size();i++){
//            products = productRepository.findProductByCategory_Id(PageRequest.of(page,size, Sort.by("score").descending()), categoryIdList.get(i));
//        }
        return products;
    }

    public Slice<CategoryGetDto> getCategoryList(int page, int size, String main, String sub) {
        Long categoryId = categoryRepository.findByMainEqualsAndSubEquals(main, sub);
        if(categoryId == null){
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }
        Slice<CategoryGetDto> products = productRepository.findProductByCategory_Id(PageRequest.of(page,size, Sort.by("score").descending()), categoryId);
        return products;
    }
}
