package gohome.dailydaily.domain.product.dto;


import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
public class OptionDto {

    @Getter
    @Setter
    public static class post{
        private String color;
        private Long stock;
    }

    @Getter
    @Setter
    @NoArgsConstructor
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
