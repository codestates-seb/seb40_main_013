package gohome.dailydaily.domain.product.controller;

import gohome.dailydaily.domain.product.controller.dto.GetProductListByDto;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.mapper.ProductMapper;
import gohome.dailydaily.domain.product.service.ProductService;
import gohome.dailydaily.global.common.dto.SliceResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ProductDto.Response> getProduct(@Valid @PathVariable("product-id") Long productId) {
        Product product = productService.getProduct(productId);

        return new ResponseEntity<>(mapper.toResponse(product), HttpStatus.OK);
    }

    // 카테고리 대분류 또는 소분류별 리스트 조회
    // 역할을 제대로 구분하면 코드는 자연스럽게 클린 코드가 됨
    @GetMapping
    public ResponseEntity<SliceResponseDto<CategoryGetDto>> getProductListByCategory(@Valid GetProductListByDto dto) {
        SliceResponseDto<CategoryGetDto> result = productService.getProductListByCategory(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/score")
    public ResponseEntity<List<CategoryGetDto>> getScoreTop5() {
        List<CategoryGetDto> products = productService.getScoreTop5();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // 5개씩
    @GetMapping("/brandListLike")
    public ResponseEntity<HashMap<String, List<CategoryGetDto>>> getBrandListLikeTop15() {
        HashMap<String, List<CategoryGetDto>> products = productService.getBrandListLikeTop15();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    // 15개씩
    @GetMapping("/categoryCreated")
    public ResponseEntity<HashMap<String, List<CategoryGetDto>>> getCategoryCreatedTop5() {
        HashMap<String, List<CategoryGetDto>> products = productService.getCategoryCreatedTop5();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // 제목으로 상품 리스트 검색
    @GetMapping("/search")
    public ResponseEntity<SliceResponseDto<CategoryGetDto>> getProductListByTitle(@Valid GetProductListByDto dto) {
        SliceResponseDto<CategoryGetDto> result = productService.getProductListByTitle(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity postProduct(@Valid ProductDto.PostProduct postProduct) throws IOException {
        String result = productService.postProduct(postProduct);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/brand/{sellerId}")
    public ResponseEntity<SliceResponseDto<CategoryGetDto>> getProductListByBrand(@Valid GetProductListByDto dto) {
        SliceResponseDto<CategoryGetDto> result = productService.getProductListByBrand(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity getProductCategoryCount(@Valid GetProductListByDto dto) {
        HashMap<String, Long> count = productService.getProductCategoryCount(dto);
        return new ResponseEntity(count, HttpStatus.OK);
    }

}
