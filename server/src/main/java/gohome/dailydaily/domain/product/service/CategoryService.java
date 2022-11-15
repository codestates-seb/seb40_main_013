package gohome.dailydaily.domain.product.service;

import gohome.dailydaily.domain.product.dto.CategoryDto;
import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Category;
import gohome.dailydaily.domain.product.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public long findCategoryId(ProductDto.PostProduct postProduct) {
        List<CategoryDto> categoryDtoList = postProduct.getCategoryList();
        Category category = categoryRepository.findByMainAndSub(categoryDtoList.get(0).getMain(), categoryDtoList.get(0).getSub());
        return category.getId();
    }
}
