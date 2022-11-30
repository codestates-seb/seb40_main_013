package gohome.dailydaily.domain.search.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class SearchDto {

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class RankResponse {
        private String keyword;
        private Long count;
    }
}
