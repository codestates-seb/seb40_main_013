package gohome.dailydaily.domain.order.service;

import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.domain.order.entity.Order;
import gohome.dailydaily.domain.order.entity.OrderProduct;
import gohome.dailydaily.domain.order.entity.OrderStatus;
import gohome.dailydaily.domain.order.repository.OrderRepository;
import gohome.dailydaily.domain.product.service.ProductService;
import gohome.dailydaily.util.Reflection;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static gohome.dailydaily.util.TestConstant.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest implements Reflection {

    @Mock
    private ProductService productService;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private MemberService memberService;

    @InjectMocks
    private OrderService orderService;
    private Order order;

    @BeforeEach
    public void init() {

        order = Order.builder()
                .id(1L)
                .status(OrderStatus.ORDER_RECEPTION)
                .member(MEMBER)
                .build();

        OrderProduct orderProduct1 = OrderProduct.builder()
                .id(1L)
                .product(PRODUCT1)
                .option(OPTION)
                .count(2)
                .build();

        OrderProduct orderProduct2 = OrderProduct.builder()
                .id(2L)
                .product(PRODUCT1)
                .option(OPTION)
                .count(3)
                .build();

        order.addOrderProduct(orderProduct1, orderProduct2);
    }

    @Test
    void createOrder() {
        // given
        given(productService.getProduct(PRODUCT1.getId())).willReturn(PRODUCT1);
//        given(productService.getProduct(PRODUCT2.getId())).willReturn(PRODUCT2);
        given(memberService.findVerifiedMember(MEMBER.getId())).willReturn(MEMBER);
        given(orderRepository.save(order)).willAnswer(AdditionalAnswers.returnsFirstArg());

        // when
        orderService.createOrder(order);

        // then
        assertThat(order.getMember().getEmail()).isEqualTo(MEMBER.getEmail());
        assertThat(order.getOrderProducts().get(0)
                .getOption().getStock()).isEqualTo(995);
        assertThat(order.getOrderProducts().get(0)
                .getProduct().getSale()).isEqualTo(5);

//        assertThatThrownBy(() -> {
//            orderService.createOrder(order);
//        }).isInstanceOf(BusinessLogicException.class)
//                .hasMessageContaining("Member not found");

    }
}