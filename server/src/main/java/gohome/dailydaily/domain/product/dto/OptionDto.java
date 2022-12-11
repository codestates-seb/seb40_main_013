package gohome.dailydaily.domain.product.dto;


import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;

@Getter
public class OptionDto {

    @Getter
    @Setter
    public static class post {
        @NotEmpty
        private String color;
        @Positive
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
