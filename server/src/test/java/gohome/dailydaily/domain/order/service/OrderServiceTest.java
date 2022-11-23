package gohome.dailydaily.domain.order.service;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.domain.order.entity.Order;
import gohome.dailydaily.domain.order.entity.OrderProduct;
import gohome.dailydaily.domain.order.entity.OrderStatus;
import gohome.dailydaily.domain.order.repository.OrderRepository;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.service.ProductService;
import gohome.dailydaily.util.Reflection;
import gohome.dailydaily.util.TestConstant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static gohome.dailydaily.util.TestConstant.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest implements Reflection{

    @Mock
    private ProductService productService;

    @Mock
    private MemberService memberService;

    @InjectMocks
    private OrderService orderService;
    private Order order;

    @BeforeEach
    public void init() {

        order = Order.builder()
                .id(1L)
                .status(OrderStatus.ORDER_PROCESSING)
                .member(Member.builder()
                        .id(TestConstant.MEMBER.getId())
                        .build())
                .build();

        OrderProduct orderProduct1 = OrderProduct.builder()
                .id(1L)
                .product(Product.builder().id(PRODUCT1.getId()).build())
                .option(Option.builder().id(OPTION.getId()).build())
                .count(2)
                .build();

        OrderProduct orderProduct2 = OrderProduct.builder()
                .id(2L)
                .product(Product.builder().id(PRODUCT2.getId()).build())
                .option(Option.builder().id(OPTION.getId()).build())
                .count(3)
                .build();

        order.addOrderProduct(orderProduct1, orderProduct2);
    }

    @Test
    void createOrder() {
        // given
        given(productService.getProduct(PRODUCT1.getId())).willReturn(PRODUCT1);
        given(productService.getProduct(PRODUCT2.getId())).willReturn(PRODUCT2);
        given(memberService.findVerifiedMember(MEMBER.getId())).willReturn(MEMBER);

        // when
        orderService.createOrder(order);

        // then
        assertThat(order.getMember().getEmail()).isEqualTo(MEMBER.getEmail());

    }
}