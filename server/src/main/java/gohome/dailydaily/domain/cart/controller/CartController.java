package gohome.dailydaily.domain.cart.controller;

import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.cart.mapper.CartMapper;
import gohome.dailydaily.domain.cart.service.CartService;
import gohome.dailydaily.global.common.security.resolver.MemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final CartMapper mapper;

    @PostMapping("/{productId}/cart")
    public ResponseEntity postCart(@PathVariable Long productId,
                                   @MemberId Long memberId) {
        Cart cart = cartService.addCart(productId, memberId);

    }
}
