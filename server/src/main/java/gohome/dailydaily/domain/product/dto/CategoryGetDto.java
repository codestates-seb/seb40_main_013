package gohome.dailydaily.domain.product.dto;

import com.querydsl.core.annotations.QueryProjection;
import gohome.dailydaily.domain.file.entity.File;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class CategoryGetDto implements Serializable {

    private final Long id;
    private final File img;
    private final String title;
    private final Integer price;
    private final Float score;
    private final String nickname;
    private final String main;
    private final Integer reviews;

    @QueryProjection
    @Builder
    public CategoryGetDto(Long id, File img, String title, Integer price, Float score, String nickname, String main, Integer reviews) {
        this.id = id;
        this.img = img;
        this.title = title;
        this.price = price;
        if (reviews > 0) {
            this.score = (score.intValue() / reviews) / 10F;
        } else {
            this.score = score;
        }
        this.nickname = nickname;
        this.main = main;
        this.reviews = reviews;
    }
}
