package gohome.dailydaily.domain.product.controller.dto;

import gohome.dailydaily.global.common.dto.PagingRequestDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetProductListByTitleDto extends PagingRequestDto {
    private String title;

    public GetProductListByTitleDto(String title) {
        this.title = title;
    }
}
