package gohome.dailydaily.domain.product.entity;

import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.order.entity.OrderProduct;
import gohome.dailydaily.domain.review.entity.Review;
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
public class Product extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private File img;

    @Lob
    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private Integer score;

    @Column(nullable = false)
    private Integer sale;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private Seller seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product")
    private final List<Option> options = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private final List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private final List<OrderProduct> orderProducts = new ArrayList<>();

    public void addOptions(Option... options) {
        this.options.addAll(List.of(options));
    }

    public void addReviews(Review... reviews) {
        this.reviews.addAll(List.of(reviews));
    }

    public void addOrderProducts(OrderProduct... orderProducts) {
        this.orderProducts.addAll(List.of(orderProducts));
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public void updateSale(int count) {
        this.sale += count;
    }
}
