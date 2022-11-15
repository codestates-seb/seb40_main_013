package gohome.dailydaily.domain.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OptionDto {
    private String size;
    private int price;
    private String color;
    private int stock;
}
