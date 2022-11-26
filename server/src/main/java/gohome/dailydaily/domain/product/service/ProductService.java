package gohome.dailydaily.domain.product.service;

import gohome.dailydaily.domain.file.service.FileService;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.member.repository.SellerRepository;
import gohome.dailydaily.domain.product.controller.dto.GetProductListByDto;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Category;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.repository.CategoryRepository;
import gohome.dailydaily.domain.product.repository.ProductRepository;
import gohome.dailydaily.domain.product.repository.param.ProductGetParam;
import gohome.dailydaily.domain.search.repository.SearchRedisRepository;
import gohome.dailydaily.global.common.dto.SliceResponseDto;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;
    private final CategoryRepository categoryRepository;
    private final SearchRedisRepository searchRedisRepository;
    private final FileService fileService;

//    @Value("${file.profileImg}")
//    private String path;

    public List<CategoryGetDto> getScoreTop5() {
        List<CategoryGetDto> products = productRepository.findTop5ByScore();

        return products;
    }

    public SliceResponseDto<CategoryGetDto> getProductListByCategory(GetProductListByDto dto) {
        SliceResponseDto<CategoryGetDto> products = productRepository
                .findAllByCategory(dto.getPageRequest(), ProductGetParam.valueOf(dto));
        if (products.getContent().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }
        return products;
    }

    public Product getProduct(Long productId) {
        return productRepository.findProductById(productId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
    }

    public SliceResponseDto<CategoryGetDto> getProductListByTitle(GetProductListByDto dto) {
        SliceResponseDto<CategoryGetDto> products = productRepository
                .findAllByTitle(dto.getPageRequest(), ProductGetParam.valueOf(dto));
        if (products.getContent().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }
        searchRedisRepository.addSearchCount(dto.getTitle());
        return products;
    }

    public HashMap<String, List<CategoryGetDto>> getBrandListLikeTop15() {

        List<Seller> brandList = sellerRepository.findAll();
        HashMap<String, List<CategoryGetDto>> products = new HashMap<>();
        List<CategoryGetDto> tmp;
        for (Seller s : brandList) {
            tmp = productRepository.findByTop15ByBrand(s.getId());
            if (tmp.isEmpty()) {
                products.put("guest", null);
            } else {
                products.put(tmp.get(2).getNickname(), tmp);
            }
        }
        return products;
    }

    public HashMap<String, List<CategoryGetDto>> getCategoryCreatedTop5() {
        List<Category> categoryList = categoryRepository.findByGroupByMain();
        HashMap<String, List<CategoryGetDto>> products = new HashMap<>();
        List<CategoryGetDto> tmp;
        for (Category c : categoryList) {
            tmp = productRepository.findByTop5ByCategory(c.getMain());
            products.put(tmp.get(0).getMain(), tmp);
        }
        return products;
    }

    public String postProduct(ProductDto.PostProduct product) throws IOException {
        //fileService.storeFile(product.getImg(), path);
        //Product productResult = mapper.toProduct(product);
        //productRepository.save(productResult);

        return "상품 등록 완료";
    }

    public SliceResponseDto<CategoryGetDto> getProductListByBrand(GetProductListByDto dto) {
        SliceResponseDto<CategoryGetDto> products = productRepository
                .findAllByBrand(dto.getPageRequest(), ProductGetParam.valueOf(dto));
        if (products.getContent().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }
        return products;
    }

    public HashMap<String, Long> getProductCategoryCount(GetProductListByDto dto) {
        HashMap<String, Long> count = new HashMap<>();
        count.put("count", productRepository.countProductCategory(ProductGetParam.valueOf(dto)));
        return count;
    }
}
