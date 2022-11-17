package gohome.dailydaily.domain.product.dto;

import gohome.dailydaily.domain.file.entity.File;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryGetDto {

    private Long id;
    private File img;
    private String title;
    private Integer price;
    private Integer score;
}
