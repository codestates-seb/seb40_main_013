package gohome.dailydaily.domain.cart.mapper;

import gohome.dailydaily.domain.cart.dto.ProductCartDto;
import gohome.dailydaily.domain.cart.entity.ProductCart;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, imports = {Option.class, Product.class})
public interface ProductCartMapper {

    @Mapping(target = "product", expression = "java(Product.builder().id(post.getProductId()).build())")
    @Mapping(target = "option", expression = "java(Option.builder().id(post.getOptionId()).build())")
    ProductCart toProductCart(ProductCartDto.Post post);

    @Mapping(target = "id", source = "productCartId")
    ProductCart toProductCart(ProductCartDto.Patch patch);

    @Mapping(target = "productCartId", source = "id")
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = ".", source = "product")
    @Mapping(target = "brandName", source = "product.seller.member.nickname")
    ProductCartDto.Response toResponse(ProductCart productCart);
}
