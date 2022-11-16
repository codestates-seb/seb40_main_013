package gohome.dailydaily.domain.product.dto;


import gohome.dailydaily.domain.product.entity.Option;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
public class OptionDto {
    private Long id;
    private String size;
    private Integer price;
    private String color;
    private Long stock;

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class Response{
        private Long optionId;
        private String color;
        private String size;
        private Integer price;
        private Long stock;
    }
}
