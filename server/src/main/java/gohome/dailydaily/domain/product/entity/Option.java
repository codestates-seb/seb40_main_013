package gohome.dailydaily.domain.product.entity;

import gohome.dailydaily.global.common.BaseTime;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Table(name = "options")
public class Option extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Long id;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private String size;

    @Column(nullable = false)
    private Long stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

}
