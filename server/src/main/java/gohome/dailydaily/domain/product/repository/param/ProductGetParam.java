package gohome.dailydaily.domain.product.repository.param;

import gohome.dailydaily.domain.product.controller.dto.GetProductListByDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ProductGetParam{

    private String mainCategory;
    private String subCategory;
    private Long sellerId;
    private String title;

    public static ProductGetParam valueOf(GetProductListByDto dto) {
        ProductGetParam param = new ProductGetParam();
        param.setMainCategory(dto.getMain());
        param.setSubCategory(dto.getSub());
        param.setTitle(dto.getTitle());
        param.setSellerId(dto.getSellerId());
        return param;
    }

}
