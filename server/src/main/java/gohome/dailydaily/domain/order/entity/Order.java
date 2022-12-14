package gohome.dailydaily.domain.order.entity;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.global.common.BaseTime;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "orders")
public class Order extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
    private final List<OrderProduct> orderProducts = new ArrayList<>();

    public void setMember(Member member) {
        this.member = member;
    }

    public void addOrderProduct(OrderProduct... orderProducts) {
        this.orderProducts.addAll(List.of(orderProducts));
    }

    public void addOrderProduct(List<OrderProduct> orderProducts) {
        this.orderProducts.addAll(orderProducts);
    }

    public void updateOrderStatus(OrderStatus orderStatus) {
        this.status = orderStatus;
    }
}
