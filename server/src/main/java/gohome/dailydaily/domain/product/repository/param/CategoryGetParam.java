package gohome.dailydaily.domain.product.repository.param;

import gohome.dailydaily.domain.product.controller.dto.GetProductListByCategoryDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class CategoryGetParam {

    private String mainCategory;
    private String subCategory;

    public static CategoryGetParam valueOf(GetProductListByCategoryDTO dto) {
        CategoryGetParam param = new CategoryGetParam();
        param.setMainCategory(dto.getMain());
        param.setSubCategory(dto.getSub());

        return param;
    }
}
