package gohome.dailydaily.domain.product.dto;


import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class OptionDto {
    @Getter
    public static class Response{
        private Long optionId;
        private String color;
        private Long stock;

        @QueryProjection
        public Response(Long optionId, String color, Long stock) {
            this.optionId = optionId;
            this.color = color;
            this.stock = stock;
        }
    }
}
