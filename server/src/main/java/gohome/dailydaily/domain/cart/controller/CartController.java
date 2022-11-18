package gohome.dailydaily.domain.cart.controller;

import gohome.dailydaily.domain.cart.dto.CartDto;
import gohome.dailydaily.domain.cart.dto.ProductCartDto;
import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.cart.entity.ProductCart;
import gohome.dailydaily.domain.cart.mapper.CartMapper;
import gohome.dailydaily.domain.cart.mapper.ProductCartMapper;
import gohome.dailydaily.domain.cart.service.CartService;
import gohome.dailydaily.global.common.security.resolver.MemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final CartMapper mapper;
    private final ProductCartMapper productCartMapper;

    @PostMapping("/{product-id}/carts")
    public ResponseEntity postCart(@PathVariable("product-id") Long productId,
                                   @MemberId Long memberId,
                                   @RequestBody ProductCartDto.Post productCartDto) {
        ProductCart productCart = productCartMapper.toProductCart(productCartDto, productId);

        Cart cart = cartService.addCart(productCart, memberId);

        return new ResponseEntity<>(mapper.toResponse(cart), HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}/carts")
    public void deleteCart(@PathVariable Long productId,
                           @MemberId Long memberId) {

        cartService.deleteCart(productId, memberId);
    }
}
