package gohome.dailydaily.domain.member.entity;

import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.global.common.BaseTime;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Seller extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seller_id")
    private Long id;

    @Column(nullable = false)
    private String brandName;

    @Column(nullable = false)
    private String brandNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "seller")
    private List<Product> products;

}
