package gohome.dailydaily.domain.cart.mapper;

import gohome.dailydaily.domain.cart.dto.ProductCartDto;
import gohome.dailydaily.domain.cart.entity.ProductCart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductCartMapper {

//    @Mapping(target = "")
//    ProductCartDto.Response toResponse(ProductCart productCart);

    default ProductCartDto.Response toResponse(ProductCart productCart) {

        return new ProductCartDto.Response(
                productCart.getProduct().getId(),
                productCart.getProduct().getImg(),
                productCart.getProduct().getTitle(),
                productCart.getCount(),
                productCart.getProduct().getPrice());
    }
}
