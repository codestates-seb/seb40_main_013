package gohome.dailydaily.domain.cart.service;

import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.cart.entity.ProductCart;
import gohome.dailydaily.domain.cart.repository.CartRepository;
import gohome.dailydaily.domain.cart.repository.ProductCartRepository;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class CartServiceTest implements Reflection {

    @Mock
    private CartRepository cartRepository;
    @Mock
    private ProductCartRepository productCartRepository;
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
        cart.addProductCart(PRODUCT_CART);
    }

    @Test
    void addCart() {
        // given
        ProductCart productCart = ProductCart.builder()
                .id(2L)
                .count(2)
                .product(Product.builder().id(PRODUCT2.getId()).build())
                .option(Option.builder().id(OPTION.getId()).build())
                .build();

        given(productCartRepository.save(any(ProductCart.class))).willAnswer(AdditionalAnswers.returnsFirstArg());
        given(productService.getProduct(PRODUCT2.getId())).willReturn(PRODUCT2);
        given(cartRepository.findCartByMember_Id(MEMBER.getId())).willReturn(Optional.ofNullable(cart));

        // when
        cartService.addCart(productCart, MEMBER.getId());

        // then
        assertThat(cart.getProductCarts()).contains(productCart);
        assertThat(cart.getProductCarts().size()).isEqualTo(2);
    }

    @Test
    void cancelCart() {

    }

    @Test
    void getCart() {

    }

    @Test
    void updateCart() {
        // given
        ProductCart productCart = ProductCart.builder()
                .id(1L)
                .count(3)
                .build();

        given(cartRepository.findCartByMember_Id(MEMBER.getId())).willReturn(Optional.ofNullable(cart));

        // when
        cartService.updateCart(productCart, MEMBER.getId());

        // then
        assertThat(cart.getProductCarts().get(0).getCount()).isEqualTo(3);
    }
}