package gohome.dailydaily.domain.product.service;

import com.google.gson.Gson;
import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.file.service.FileService;
import gohome.dailydaily.domain.like.repository.LikeRepository;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.member.repository.SellerRepository;
import gohome.dailydaily.domain.member.service.SellerService;
import gohome.dailydaily.domain.product.controller.dto.GetProductListByDto;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Category;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.mapper.ProductMapper;
import gohome.dailydaily.domain.product.repository.CategoryRepository;
import gohome.dailydaily.domain.product.repository.ProductRepository;
import gohome.dailydaily.domain.product.repository.param.ProductGetParam;
import gohome.dailydaily.domain.search.repository.SearchRedisRepository;
import gohome.dailydaily.global.common.dto.SliceResponseDto;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    @Value("${file.productImg}")
    private String productPath;

    @Value("${file.productContentsImg}")
    private String productContentsPath;


    private final ProductRepository productRepository;
    private final LikeRepository likeRepository;
    private final SellerRepository sellerRepository;
    private final SellerService sellerService;
    private final CategoryRepository categoryRepository;
    private final SearchRedisRepository searchRedisRepository;
    private final FileService fileService;

    private final ProductMapper mapper;

    public List<CategoryGetDto> getScoreTop5() {
        return productRepository.findTop5ByScore();
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

    public Product findProduct(Long memberId, Long productId) {
        Product product = getProduct(productId);

        Optional.ofNullable(memberId)
                .ifPresent(id -> product.updateLike(likeRepository.existsByMember_IdAndProduct_Id(id, productId)));

        return product;
    }

    public SliceResponseDto<CategoryGetDto> getProductListByTitle(GetProductListByDto dto) {
        dto.setTitle(dto.getTitle().replace(" ", ""));
        if (dto.getTitle().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.TITLE_NOT_BLANK);
        }
        SliceResponseDto<CategoryGetDto> products = productRepository
                .findAllByTitle(dto.getPageRequest(), ProductGetParam.valueOf(dto));

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
                products.put(tmp.get(0).getNickname(), tmp);
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

    @Transactional
    public Long postProduct(ProductDto.PostProduct postProduct) throws IOException {

        Long categoryId = categoryRepository.findIdByMainAndSub(postProduct.getMain(), postProduct.getSub());

        sellerService.findVerifiedSeller(postProduct.getSellerId());

        File file = fileService.storeFile(postProduct.getImg(), productPath);

        List<String> test = new ArrayList<>();
        for (MultipartFile f : postProduct.getContent()) {
            File content = fileService.storeFile(f, productContentsPath);
            test.add(content.getFullPath());
        }

        String content = new Gson().toJson(test);

        Product product = mapper.toProduct(postProduct);

        product.initInfo(file, content, Category.builder().id(categoryId).build());

        productRepository.save(product);

        return product.getId();
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
