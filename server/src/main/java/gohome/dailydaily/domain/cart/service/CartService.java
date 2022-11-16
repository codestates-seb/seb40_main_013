package gohome.dailydaily.domain.cart.service;

import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.domain.product.repository.ProductRepository;
import gohome.dailydaily.domain.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {
    private final ProductRepository productRepository;
    private final MemberService memberService;
    public Cart addCart(Long productId, Long memberId) {

    }
}
