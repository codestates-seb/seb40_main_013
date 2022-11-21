package gohome.dailydaily.domain.review.entity;

import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.global.common.BaseTime;
import lombok.*;

import javax.persistence.*;
import java.util.Optional;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Review extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    private File img;

    @Lob
    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer score;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    public void initInfo(Member member, Product product) {
        this.member = member;
        this.product = product;
    }

    public Review updateReview(Review review) {
        Optional.ofNullable(review.getContent())
                .ifPresent(content -> this.content = content);
        Optional.ofNullable(review.getScore())
                .ifPresent(score -> this.score = score);

        return this;
    }

}
