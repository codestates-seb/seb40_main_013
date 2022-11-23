package gohome.dailydaily.domain.product.controller;

import gohome.dailydaily.domain.product.controller.dto.GetProductListByBrandDTO;
import gohome.dailydaily.domain.product.controller.dto.GetProductListByCategoryDTO;
import gohome.dailydaily.domain.product.controller.dto.GetProductListByDto;
import gohome.dailydaily.domain.product.controller.dto.GetProductListByTitleDto;
import gohome.dailydaily.domain.product.dto.CategoryDto;
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

import javax.validation.constraints.Positive;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final ProductMapper mapper;

    // 미완성 추가구현 필요
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

    // 카테고리 대분류 또는 소분류별 리스트 조회
    // 역할을 제대로 구분하면 코드는 자연스럽게 클린 코드가 됨
    @GetMapping
    public ResponseEntity<SliceResponseDto<CategoryGetDto>> getProductListByCategory(GetProductListByCategoryDTO dto) {
        SliceResponseDto<CategoryGetDto> result = productService.getProductListByCategory(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 제목으로 상품 리스트 검색
    @GetMapping("/search")
    public ResponseEntity<SliceResponseDto<CategoryGetDto>> getProductListByTitle(GetProductListByTitleDto dto) {
        SliceResponseDto<CategoryGetDto> result = productService.getProductListByTitle(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/details/{product-id}")
    public ResponseEntity<ProductDto.Response> getProduct(@PathVariable("product-id") Long productId) {
        Product product = productService.getProduct(productId);

        return new ResponseEntity<>(mapper.toResponse(product), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity postProduct(ProductDto.PostProduct product) {
        String result = productService.postProduct(product);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/brand/{sellerId}")
    public ResponseEntity<SliceResponseDto<CategoryGetDto>> getProductListByBrand(GetProductListByBrandDTO dto) {
        SliceResponseDto<CategoryGetDto> result = productService.getProductListByBrand(dto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
