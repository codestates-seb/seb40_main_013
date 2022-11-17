package gohome.dailydaily.domain.product.mapper;

import gohome.dailydaily.domain.product.dto.OptionDto;
import gohome.dailydaily.domain.product.entity.Option;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OptionMapper {
    @Mapping(target = "optionId", source = "id")
    OptionDto.Response toResponse(Option option);
}
