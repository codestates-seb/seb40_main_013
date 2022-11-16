package gohome.dailydaily.domain.product.mapper;

import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Product;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-16T11:21:59+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public Product toProduct(ProductDto.Post postProduct) {
        if ( postProduct == null ) {
            return null;
        }

        Product.ProductBuilder product = Product.builder();

        product.title( postProduct.getTitle() );
        product.content( postProduct.getContent() );
        product.price( postProduct.getPrice() );

        return product.build();
    }
}
