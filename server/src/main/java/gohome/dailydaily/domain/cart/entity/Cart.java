package gohome.dailydaily.domain.cart.entity;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.global.common.BaseTime;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Cart extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.PERSIST)
    private final List<ProductCart> productCarts = new ArrayList<>();

    public void addProductCart(ProductCart productCart) {
        this.productCarts.add(productCart);
        if (productCart.getCart() != this) {
            productCart.addCart(this);
        }
    }
}
