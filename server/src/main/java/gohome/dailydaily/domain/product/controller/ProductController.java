package gohome.dailydaily.domain.product.controller;

import gohome.dailydaily.domain.product.controller.dto.GetProductListByDto;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.mapper.ProductMapper;
import gohome.dailydaily.domain.product.service.ProductService;
import gohome.dailydaily.global.common.dto.SliceResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final ProductMapper mapper;

    @GetMapping("/details/{product-id}")
    @Cacheable(key = "#productId +\":\" + #memberId", value = "getProduct")
    public ProductDto.Response getProduct(@AuthenticationPrincipal Long memberId,
                                          @Valid @PathVariable("product-id") Long productId) {
        Product product = productService.findProduct(memberId, productId);

        return mapper.toResponse(product);
    }

    // 카테고리 대분류 또는 소분류별 리스트 조회
    // 역할을 제대로 구분하면 코드는 자연스럽게 클린 코드가 됨
    @GetMapping
    @Cacheable(key = "#dto", value = "getProductListByCategory")
    public SliceResponseDto<CategoryGetDto> getProductListByCategory(@Valid GetProductListByDto dto) {
        return productService.getProductListByCategory(dto);
    }

    @GetMapping("/score")
    @Cacheable(value = "getScoreTop5")
    public List<CategoryGetDto> getScoreTop5() {
        return productService.getScoreTop5();
    }

    // 5개씩
    @GetMapping("/brandListLike")
    @Cacheable(value = "getBrandListLikeTop15")
    public HashMap<String, List<CategoryGetDto>> getBrandListLikeTop15() {
        return productService.getBrandListLikeTop15();
    }


    // 15개씩
    @GetMapping("/categoryCreated")
    @Cacheable(value = "getCategoryCreatedTop5")
    public HashMap<String, List<CategoryGetDto>> getCategoryCreatedTop5() {
        return productService.getCategoryCreatedTop5();
    }

    // 제목으로 상품 리스트 검색
    @GetMapping("/search")
    @Cacheable(key = "#dto", value = "getProductListByTitle", unless = "#result = null")
    public SliceResponseDto<CategoryGetDto> getProductListByTitle(@Valid GetProductListByDto dto) {
        return productService.getProductListByTitle(dto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long postProduct(@Valid ProductDto.PostProduct postProduct) throws IOException {
        return productService.postProduct(postProduct);
    }

    @GetMapping("/brand/{sellerId}")
    @Cacheable(key = "#dto", value = "getProductListByBrand")
    public SliceResponseDto<CategoryGetDto> getProductListByBrand(@Valid GetProductListByDto dto) {
        return productService.getProductListByBrand(dto);
    }

    @GetMapping("/count")
    @Cacheable(key = "#dto", value = "getProductCategoryCount")
    public HashMap<String, Long> getProductCategoryCount(@Valid GetProductListByDto dto) {
        return productService.getProductCategoryCount(dto);
    }

}
