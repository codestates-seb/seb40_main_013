package gohome.dailydaily.domain.like.mapper;

import gohome.dailydaily.domain.like.entity.Like;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.mapper.ProductMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;
//
//@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
//public interface LikeMapper {
//
//    @Mapping(target = "")
//    Page<Product> toCategoryGetDto(Page<Like> likes);
//}
