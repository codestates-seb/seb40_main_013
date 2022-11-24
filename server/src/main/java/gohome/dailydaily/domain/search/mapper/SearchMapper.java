package gohome.dailydaily.domain.search.mapper;

import gohome.dailydaily.domain.search.dto.SearchDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.redis.core.ZSetOperations;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SearchMapper {

    @Mapping(target = "keyword", source = "value")
    @Mapping(target = "count", source = "score")
    SearchDto.RankResponse toResponse(ZSetOperations.TypedTuple<String> tuple);

    List<SearchDto.RankResponse> toResponse(Set<ZSetOperations.TypedTuple<String>> tuples);
}
