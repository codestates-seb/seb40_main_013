package gohome.dailydaily.domain.order.service;

import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.domain.order.entity.Order;
import gohome.dailydaily.domain.order.entity.OrderStatus;
import gohome.dailydaily.domain.order.repository.OrderRepository;
import gohome.dailydaily.domain.product.service.ProductService;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final MemberService memberService;

    public Order createOrder(Order order) {
        verifyOrder(order);
        order.updateOrderStatus(OrderStatus.ORDER_RECEPTION);
        // 상품 옵션 재고 감소

        return orderRepository.save(order);
    }

    private Order findVerifiedOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        return optionalOrder.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
    }

    private void verifyOrder(Order order) {
        memberService.findVerifiedMember(order.getMember().getId());

        order.getOrderProducts()
                .forEach(orderProduct -> {
                    productService.getProduct(orderProduct.getProduct().getId());
                    orderProduct.addOrder(order);
                });

    }

    @Transactional(readOnly = true)
    public Page<Order> findByMember_Id(Long memberId, Pageable pageable) {

        return orderRepository.findOrderByMember_Id(memberId, pageable);
    }
}
