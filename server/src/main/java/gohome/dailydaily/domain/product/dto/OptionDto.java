package gohome.dailydaily.domain.product.dto;


import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
public class OptionDto {

    @Getter
    @Setter
    public static class post {
        private String color;
        private Long stock;
    }

    @Getter
    public static class Response implements Serializable {
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
