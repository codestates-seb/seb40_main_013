package gohome.dailydaily.domain.product.mapper;

import com.google.gson.Gson;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.member.mapper.SellerMapper;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.review.mapper.ReviewMapper;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, imports = {Gson.class, Seller.class},
        uses = {OptionMapper.class, ReviewMapper.class, SellerMapper.class},
        builder = @Builder(disableBuilder = true))
public interface ProductMapper {
    @Mapping(target = "productId", source = "id")
    @Mapping(target = "content", expression = "java(new Gson().fromJson(product.getContent(), List.class))")
    @Mapping(target = "score", expression = "java(product.getScore() / product.getReviews().size() / 10F)")
    @Mapping(target = "main", source = "category.main")
    ProductDto.Response toResponse(Product product);

    @Mapping(target = "seller", expression = "java(Seller.builder().id(postProduct.getSellerId()).build())")
    @Mapping(target = "sale", expression = "java(0)")
    @Mapping(target = "score", expression = "java(0)")
    @Mapping(target = "content", ignore = true)
    @Mapping(target = "img", ignore = true)
    Product toProduct(ProductDto.PostProduct postProduct);

    @Mapping(target = "main", source = "product.category.main")
    @Mapping(target = "nickname", source = "product.seller.member.nickname")
    @Mapping(target = "reviews", expression = "java(product.getReviews().size())")
    CategoryGetDto toCategoryGetDto(Product product);
}
