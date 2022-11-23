package gohome.dailydaily.domain.order.mapper;

import gohome.dailydaily.domain.order.dto.OrderProductDto;
import gohome.dailydaily.domain.order.entity.OrderProduct;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, imports = {Option.class, Product.class})
public interface OrderProductMapper {

    @Mapping(target = "id", source = "productId")
    @Mapping(target = "option", expression = "java(Option.builder().id(post.getOptionId()).build())")
    @Mapping(target = "product", expression = "java(Product.builder().id(post.getProductId()).build())")
    OrderProduct toOrderProduct(OrderProductDto.Post post);

    OrderProduct toOrderProduct(OrderProductDto.Patch patch);

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "brandName", source = "product.seller.member.nickname")
    @Mapping(target = ".", source = "product")
    OrderProductDto.Response toResponse(OrderProduct orderProduct);
}
