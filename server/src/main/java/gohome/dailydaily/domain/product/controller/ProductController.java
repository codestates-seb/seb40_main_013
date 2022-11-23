package gohome.dailydaily.domain.product.controller;

import gohome.dailydaily.domain.product.controller.dto.GetProductListByCategoryDTO;
import gohome.dailydaily.domain.product.controller.dto.GetProductListByTitleDto;
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
    public ResponseEntity<List<List<CategoryGetDto>>> getBrandListLikeTop15() {
        List<List<CategoryGetDto>> products = productService.getBrandListLikeTop15();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    // 15개씩
    @GetMapping("/categoryCreated")
    public ResponseEntity<List<List<CategoryGetDto>>> getCategoryCreatedTop5() {
        List<List<CategoryGetDto>> products = productService.getCategoryCreatedTop5();
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


    // 대분류
//    @GetMapping("/{main}")
//    public SliceResponseDto<CategoryGetDto> getCategoryMain(@PathVariable("main") String main,
//                                                            @PageableDefault(size = 20, sort = "createdAt",
//                                                                    direction = Sort.Direction.DESC) Pageable pageable) {
//        Slice<CategoryGetDto> products = productService.getCategoryList(pageable, main);
//        return SliceResponseDto.of(products.map(mapper::toResponse)); // 매퍼로 변경하고 하는 것들은 모두 서비스 로직에서 끝나야 함
//        // controller 클래스와 service 클래스의 역할와 책임을 확실히 구분할 것 => OOP
//    }
//
//    // 소분류
//    @GetMapping("/{main}/{sub}")
//    public SliceResponseDto<CategoryGetDto> getCategoryMainSub(@PathVariable("main") String main,
//                                                               @PathVariable("sub") String sub,
//                                                               @PageableDefault(size = 20, sort = "createdAt",
//                                                                       direction = Sort.Direction.DESC) Pageable pageable) {
//        Slice<CategoryGetDto> products = productService.getCategoryList(pageable, main, sub);
//        return SliceResponseDto.of(products.map(mapper::toResponse));
//    }

    @GetMapping("/details/{product-id}")
    public ProductDto.Response getProduct(@PathVariable("product-id") Long productId) {
        Product product = productService.getProduct(productId);

        return mapper.toResponse(product);
    }

}
