package gohome.dailydaily.domain.order.entity;

import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.global.common.BaseTime;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class OrderProduct extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_product_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "options")
    private Option option;

    @Column
    private Integer count;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    public void addOrder(Order order) {
        this.order = order;
    }

    public void addProduct(Product product) {
        this.product = product;
        this.product.addOrderProduct(this);
    }

}
