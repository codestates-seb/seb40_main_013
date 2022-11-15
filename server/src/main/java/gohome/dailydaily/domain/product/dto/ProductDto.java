package gohome.dailydaily.domain.product.dto;

import gohome.dailydaily.domain.product.entity.Category;
import gohome.dailydaily.domain.product.entity.Option;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

public class ProductDto {

    @Getter
    @Setter
    public static class PostProduct{
        private long sellerId;
        private String title;
        private String content;
        private String img;
        private List<CategoryDto> categoryList= new ArrayList<>();
        private int price;
        private List<OptionDto> optionList = new ArrayList<>();
    }

}
