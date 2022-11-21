package gohome.dailydaily.domain.product.repository.param;

import gohome.dailydaily.domain.product.controller.dto.GetProductListByCategoryDTO;
import gohome.dailydaily.domain.product.controller.dto.GetProductListByTitleDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class TitleGetParam {

    private String title;

    public static TitleGetParam valueOf(GetProductListByTitleDto dto) {
        TitleGetParam param = new TitleGetParam();
        param.setTitle(dto.getTitle());

        return param;
    }
}
