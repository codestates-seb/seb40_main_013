package gohome.dailydaily.domain.product.repository;

import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.repository.param.ProductGetParam;
import gohome.dailydaily.global.common.dto.SliceResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductRepositoryCustom {

    List<CategoryGetDto> findTop5ByScore();

    SliceResponseDto<CategoryGetDto> findAllByCategory(Pageable pageable, ProductGetParam param);

    List<CategoryGetDto> findByTop15ByBrand(Long id);

    List<CategoryGetDto> findByTop5ByCategory(String main);

    SliceResponseDto<CategoryGetDto> findAllByTitle(Pageable pageRequest, ProductGetParam valueOf);

    SliceResponseDto<CategoryGetDto> findAllByBrand(Pageable pageRequest, ProductGetParam valueOf);

}
