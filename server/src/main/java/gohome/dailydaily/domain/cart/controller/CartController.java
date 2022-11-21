package gohome.dailydaily.domain.cart.controller;

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
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final CartMapper mapper;
    private final ProductCartMapper productCartMapper;

    @PostMapping
    public ResponseEntity postProductCart(@MemberId Long memberId,
                                          @RequestBody ProductCartDto.Post productCartDto) {
        ProductCart productCart = productCartMapper.toProductCart(productCartDto);

        Cart cart = cartService.addCart(productCart, memberId);

        return new ResponseEntity<>(mapper.toResponse(cart), HttpStatus.CREATED);
    }

    @PatchMapping("/{product-cart-id}")
    public ResponseEntity patchProductCart(@MemberId Long memberId,
                                           @PathVariable("product-cart-id") Long productCartId,
                                           @RequestBody ProductCartDto.Patch patch) {

        ProductCart productCart = productCartMapper.toProductCart(patch, productCartId);
        Cart cart = cartService.updateCart(productCart, memberId);

        return new ResponseEntity<>(mapper.toResponse(cart), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getCart(@MemberId Long memberId) {

        Cart cart = cartService.findVerifiedCart(memberId);

        return new ResponseEntity<>(mapper.toResponse(cart), HttpStatus.OK);
    }

    @DeleteMapping("/{product-cart-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public String deleteProductCart(@PathVariable("product-cart-id") Long productCartId,
                                  @MemberId Long memberId) {

        cartService.cancelCart(productCartId, memberId);
        return "success deleteProductCart";
    }
}
