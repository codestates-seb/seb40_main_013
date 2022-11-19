package gohome.dailydaily.domain.cart.mapper;

import gohome.dailydaily.domain.cart.dto.CartDto;
import gohome.dailydaily.domain.cart.entity.Cart;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = ProductCartMapper.class)
public interface CartMapper {

    @Mapping(target = "cartId", source = "id")
    CartDto.Response toResponse(Cart cart);
}
