package gohome.dailydaily.domain.cart.service;

import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.cart.entity.ProductCart;
import gohome.dailydaily.domain.cart.repository.CartRepository;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.repository.MemberRepository;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.service.ProductService;
import gohome.dailydaily.util.Reflection;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static gohome.dailydaily.util.TestConstant.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class CartServiceTest implements Reflection {

    @Mock
    private CartRepository cartRepository;
    @Mock
    private ProductService productService;

    @InjectMocks
    private CartService cartService;
    private Cart cart;

    @BeforeEach
    public void init() {

        cart = Cart.builder()
                .id(1L)
                .member(MEMBER)
                .build();
    }

    @Test
    void addCart() {
        // given
        ProductCart productCart = ProductCart.builder()
                .id(1L)
                .count(2)
                .product(Product.builder().id(PRODUCT.getId()).build())
                .option(Option.builder().id(OPTION.getId()).build())
                .build();

        given(cartRepository.save(any(Cart.class))).willAnswer(AdditionalAnswers.returnsFirstArg());
        given(productService.getProduct(PRODUCT.getId())).willReturn(PRODUCT);
        given(cartRepository.findByMember_Id(MEMBER.getId())).willReturn(Optional.ofNullable(cart));

        // when
        cartService.addCart(productCart, MEMBER.getId());

        // then
        assertThat(cart.getProductCarts()).contains(productCart);
        assertThat(cart.getProductCarts().size()).isEqualTo(1);


    }
}