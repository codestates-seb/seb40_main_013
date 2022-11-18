package gohome.dailydaily.domain.product.repository;

import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

public interface ProductRepositoryCustom {
    Slice<CategoryGetDto> findByCategory_Main(Pageable pageable, String main);

    Slice<CategoryGetDto> findByCategory_MainAndCategory_Sub(Pageable pageable, String main, String sub);

}
