package gohome.dailydaily.domain.cart.mapper;

import gohome.dailydaily.domain.cart.dto.ProductCartDto;
import gohome.dailydaily.domain.cart.entity.ProductCart;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductCartMapper {

//    @Mapping(target = "")
//    ProductCartDto.Response toResponse(ProductCart productCart);
    default ProductCart toProductCart(ProductCartDto.Post productCartDto, Long productId) {

        Option option = Option.builder().id(productCartDto.getOptionId()).build();
        Product product = Product.builder().id(productId).build();

        return ProductCart.builder()
                .count(productCartDto.getCount())
                .option(option)
                .product(product).build();
    }

    default ProductCartDto.Response toResponse(ProductCart productCart) {

        return new ProductCartDto.Response(
                productCart.getProduct().getId(),
                productCart.getProduct().getImg(),
                productCart.getProduct().getTitle(),
                productCart.getCount(),
                productCart.getProduct().getPrice());
    }
}
