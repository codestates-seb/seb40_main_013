package gohome.dailydaily.domain.product.mapper;

import gohome.dailydaily.domain.member.mapper.SellerMapper;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.review.mapper.ReviewMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {OptionMapper.class, ReviewMapper.class, SellerMapper.class})
public interface ProductMapper {
    @Mapping(target = "productId", source = "id")
    @Mapping(target = "score", expression = "java(product.getScore() / 10F)")
    ProductDto.Response toResponse(Product product);

    CategoryGetDto toResponse(CategoryGetDto categoryGetDto);
}
