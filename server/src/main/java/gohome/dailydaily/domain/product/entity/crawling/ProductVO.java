package gohome.dailydaily.domain.product.entity.crawling;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.IDENTITY;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class ProductVO {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private String img;
    private String title;
    private String content;
    private int price;
    private float score;
    private String seller;
    private String category;
}
