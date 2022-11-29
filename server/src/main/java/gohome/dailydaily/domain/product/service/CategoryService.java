package gohome.dailydaily.domain.product.service;

import gohome.dailydaily.domain.product.dto.CategoryDto;
import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Category;
import gohome.dailydaily.domain.product.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Long findCategoryId(ProductDto.PostProduct postProduct) {
        return categoryRepository.findIdByMainAndSub(postProduct.getMain(),postProduct.getSub());
        
    }
}
