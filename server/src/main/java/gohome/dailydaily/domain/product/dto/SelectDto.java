package gohome.dailydaily.domain.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelectDto {

    private Long productId;
    private String title;
    private String main;
    private Float score;

}
