package gohome.dailydaily.domain.product.mapper;

import com.google.gson.Gson;
import gohome.dailydaily.domain.member.mapper.SellerMapper;
import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.review.mapper.ReviewMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, imports = Gson.class, uses = {OptionMapper.class, ReviewMapper.class, SellerMapper.class})
public interface ProductMapper {
    @Mapping(target = "productId", source = "id")
    @Mapping(target = "content", expression = "java(new Gson().fromJson(product.getContent(), List.class))")
    @Mapping(target = "score", expression = "java(product.getScore() / 10F)")
    @Mapping(target = "main", source = "category.main")
    ProductDto.Response toResponse(Product product);

}
