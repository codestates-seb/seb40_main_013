package gohome.dailydaily.domain.product.service;

import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.member.repository.SellerRepository;
import gohome.dailydaily.domain.product.controller.dto.GetProductListByCategoryDTO;
import gohome.dailydaily.domain.product.controller.dto.GetProductListByTitleDto;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.entity.Category;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.mapper.ProductMapper;
import gohome.dailydaily.domain.product.repository.CategoryRepository;
import gohome.dailydaily.domain.product.repository.ProductRepository;
import gohome.dailydaily.domain.product.repository.param.CategoryGetParam;
import gohome.dailydaily.domain.product.repository.param.TitleGetParam;
import gohome.dailydaily.domain.search.repository.SearchRedisRepository;
import gohome.dailydaily.global.common.dto.SliceResponseDto;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper mapper;
    private final SellerRepository sellerRepository;
    private final CategoryRepository categoryRepository;
    private final SearchRedisRepository searchRedisRepository;

    public List<CategoryGetDto> getScoreTop5() {
        List<CategoryGetDto> products = productRepository.findTop5ByScore();

        return products;
    }

    public SliceResponseDto<CategoryGetDto> getProductListByCategory(GetProductListByCategoryDTO dto) {
        SliceResponseDto<CategoryGetDto> products = productRepository
                .findAllByCategory(dto.getPageRequest(), CategoryGetParam.valueOf(dto));
        if (products.getContent().isEmpty()) {
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

    public SliceResponseDto<CategoryGetDto> getProductListByTitle(GetProductListByTitleDto dto) {
        SliceResponseDto<CategoryGetDto> products = productRepository
                .findAllByTitle(dto.getPageRequest(), TitleGetParam.valueOf(dto));
        if (products.getContent().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }
        searchRedisRepository.addSearchCount(dto.getTitle());
        return products;
    }

    public List<List<CategoryGetDto>> getBrandListLikeTop5() {

        List<List<CategoryGetDto>> product = new ArrayList<>();
        List<Seller> brandList = sellerRepository.findAll();
        for (Seller s : brandList) {
            product.add(productRepository.findByTop5ByBrand(s.getId()));
        }
        return product;
    }

    public List<List<CategoryGetDto>> getCategoryCreatedTop15() {
        List<List<CategoryGetDto>> product = new ArrayList<>();
        List<Category> categoryList = categoryRepository.findByGroupByMain();
        for (Category c : categoryList) {
            product.add(productRepository.findByTop15ByCategory(c.getMain()));
        }
        return product;
    }
}
