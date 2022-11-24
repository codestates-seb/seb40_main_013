package gohome.dailydaily.domain.order.entity;

import lombok.Getter;

@Getter
public enum OrderStatus {
    ORDER_RECEPTION("주문 접수"),
    ORDER_SHIPPING("배송 중"),
    ORDER_COMPLETED("배송 완료"),
    ORDER_CANCELED("주문 취소");

    private final String message;

    OrderStatus(String message) {
        this.message = message;
    }
}
