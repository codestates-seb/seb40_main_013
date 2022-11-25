package gohome.dailydaily.domain.product.dto;

import com.querydsl.core.annotations.QueryProjection;
import gohome.dailydaily.domain.file.entity.File;
import lombok.Getter;

@Getter
public class CategoryGetDto {

    private Long id;
    private File img;
    private String title;
    private Integer price;
    private Float score;
    private String nickname;
    private String main;

    @QueryProjection
    public CategoryGetDto(Long id, File img, String title, Integer price, Float score, String nickname,String main) {
        this.id = id;
        this.img = img;
        this.title = title;
        this.price = price;
        this.score = score;
        this.nickname = nickname;
        this.main = main;
    }
}
