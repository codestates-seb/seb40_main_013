package gohome.dailydaily.domain.product.controller.dto;

import gohome.dailydaily.global.common.dto.PagingRequestDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
public class GetProductListByDto extends PagingRequestDto {

    private String main;
    private String sub;
    private Long sellerId;
    private String title;

    public GetProductListByDto(String main, String sub, Long sellerId, String title) {
        this.main = main;
        this.sub = sub;
        this.sellerId = sellerId;
        this.title = title;
    }
}
