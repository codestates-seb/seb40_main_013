package gohome.dailydaily.domain.product.controller;

import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.mapper.ProductMapper;
import gohome.dailydaily.domain.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final ProductMapper mapper;

    // 미완성 추가구현 필요
    @GetMapping("/all")
    public ResponseEntity getScoreAll() {
        List<Product> products = productService.findProduct();
        return new ResponseEntity(products, HttpStatus.OK);
    }

    // 대분류
    @GetMapping("/main")
    public ResponseEntity<Slice<CategoryGetDto>> getCategoryMain(@RequestParam(value = "main") String main,
                                                                 @PageableDefault(size = 20, sort = "createdAt",
                                                                         direction = Sort.Direction.DESC) Pageable pageable) {
        return new ResponseEntity<>(productService.getCategoryList(pageable, main), HttpStatus.OK);
    }

    // 소분류
    @GetMapping("/sub")
    public ResponseEntity<Slice<CategoryGetDto>> getCategorysub(@RequestParam(value = "main") String main,
                                                                @RequestParam(value = "sub") String sub,
                                                                @PageableDefault(size = 20, sort = "createdAt",
                                                                        direction = Sort.Direction.DESC) Pageable pageable) {
        return new ResponseEntity<>(productService.getCategoryList(pageable, main, sub), HttpStatus.OK);
    }

}
