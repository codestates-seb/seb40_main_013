package gohome.dailydaily.domain.product.controller.dto;

import gohome.dailydaily.global.common.dto.PagingRequestDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetProductListByCategoryDTO extends PagingRequestDto {

    private String main;
    private String sub;

    public GetProductListByCategoryDTO(String main, String sub) {
        this.main = main;
        this.sub = sub;
    }
}
