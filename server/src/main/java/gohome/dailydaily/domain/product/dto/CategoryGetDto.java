package gohome.dailydaily.domain.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryGetDto {
//    Long getId();
//    String getTitle();
//    Integer getPrice();
//    Float getScore();

    private Long id;
    private String title;
    private Integer price;
    private Integer score;
}
