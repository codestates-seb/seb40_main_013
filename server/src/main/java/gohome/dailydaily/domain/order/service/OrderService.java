package gohome.dailydaily.domain.order.service;

import gohome.dailydaily.domain.cart.service.CartService;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.domain.order.entity.Order;
import gohome.dailydaily.domain.order.entity.OrderProduct;
import gohome.dailydaily.domain.order.entity.OrderStatus;
import gohome.dailydaily.domain.order.repository.OrderRepository;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.product.entity.Product;
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
    private final CartService cartService;

    public Order createOrder(Order order) {
        verifyOrder(order);
        order.updateOrderStatus(OrderStatus.ORDER_RECEPTION);
        // 상품 옵션 재고 감소 + 상품 판매수 증가

        return orderRepository.save(order);
    }

    private Order findVerifiedOrder(Long memberId, Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));

        if (!order.getMember().getId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.ORDER_DOES_NOT_MATCH);
        }

        return order;
    }

    private void verifyOrder(Order order) {
        Member member = memberService.findVerifiedMember(order.getMember().getId());
        order.setMember(member);

        order.getOrderProducts()
                .forEach(orderProduct -> {
                    Product product = productService.getProduct(orderProduct.getProduct().getId());

                    Option findOption = product.getOptions().stream()
                            .filter(option -> option.getId().equals(orderProduct.getOption().getId()))
                            .findAny()
                            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.OPTION_NOT_FOUND));

                    orderProduct.addProduct(product);
                    orderProduct.addOption(findOption);
                    orderProduct.addOrder(order);

                    Optional.ofNullable(orderProduct.getProductCartId())
                            .ifPresent(productCartId -> cartService.cancelCart(productCartId, member.getId()));
                    updateSaleAndStock(orderProduct);
                });
    }

    private void updateSaleAndStock(OrderProduct orderProduct) {
        if (orderProduct.getOption().getStock() < orderProduct.getCount()) {
            throw new BusinessLogicException(ExceptionCode.OUT_OF_STOCK);
        }
        orderProduct.getProduct().updateSale(orderProduct.getCount());
        orderProduct.getOption().updateStock(orderProduct.getCount());
    }

    @Transactional(readOnly = true)
    public Page<Order> findByMember_Id(Long memberId, Pageable pageable) {

        return orderRepository.findOrderByMember_Id(memberId, pageable);
    }

    public void cancelOrder(Long memberId, Long orderId) {

        Order order = findVerifiedOrder(memberId, orderId);

        if (!order.getStatus().equals(OrderStatus.ORDER_RECEPTION)) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CANCEL_ORDER);
        }

        order.updateOrderStatus(OrderStatus.ORDER_CANCELED);
    }
}
