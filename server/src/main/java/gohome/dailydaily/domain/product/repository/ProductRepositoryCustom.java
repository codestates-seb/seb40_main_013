package gohome.dailydaily.domain.product.repository;

import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.OptionDto;
import gohome.dailydaily.domain.product.repository.param.CategoryGetParam;
import gohome.dailydaily.global.common.dto.SliceResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ProductRepositoryCustom {

    List<CategoryGetDto> findTop5ByScore();

    SliceResponseDto<CategoryGetDto> findAllByCategory(Pageable pageable, CategoryGetParam param);

    List<CategoryGetDto> findByTop5ByBrand(Long id);

    List<CategoryGetDto> findByTop15ByCategory(String main);

//    List<OptionDto.Response> findByProduct(Long id);
//    Slice<CategoryGetDto> findByCategory_Main(Pageable pageable, String main);
//
//    Slice<CategoryGetDto> findByCategory_MainAndCategory_Sub(Pageable pageable, String main, String sub);

}
