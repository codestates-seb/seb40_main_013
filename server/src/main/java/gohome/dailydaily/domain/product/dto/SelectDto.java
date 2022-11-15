package gohome.dailydaily.domain.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelectDto {

    private long product_id;
    private String title;
    private String main;
    private float score;

}
