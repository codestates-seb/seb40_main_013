package gohome.dailydaily.domain.product.service;

import gohome.dailydaily.domain.product.controller.dto.GetProductListByCategoryDTO;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.mapper.ProductMapper;
import gohome.dailydaily.domain.product.repository.ProductRepository;
import gohome.dailydaily.domain.product.repository.param.CategoryGetParam;
import gohome.dailydaily.global.common.dto.SliceResponseDto;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper mapper;

    public List<CategoryGetDto> findProduct() {
        List<List<Product>> products = new ArrayList<>();
        products.add(productRepository.findTop5By());

        return null;
    }

    public SliceResponseDto<CategoryGetDto> getProductListByCategory(GetProductListByCategoryDTO dto) {
        SliceResponseDto<CategoryGetDto> products =productRepository
                .findAllByCategory(dto.getPageRequest(),CategoryGetParam.valueOf(dto));
        if (products.getContent().isEmpty()){
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }
        return products;
    }

//    public Slice<CategoryGetDto> getCategoryList(Pageable pageable, String main) {
//        Slice<CategoryGetDto> products = productRepository.findByCategory_Main(pageable, main);
//        if (products.isEmpty()) {
//            throw new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND);
//        }
//        return products;
//
//    }
//
//    public Slice<CategoryGetDto> getCategoryList(Pageable pageable, String main, String sub) {
//        Slice<CategoryGetDto> products = productRepository.findByCategory_MainAndCategory_Sub(pageable, main, sub);
//        if (products.isEmpty()) {
//            throw new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND);
//        }
//        return products;
//    }

    public Product getProduct(Long productId) {
        return productRepository.findProductById(productId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
    }
}
