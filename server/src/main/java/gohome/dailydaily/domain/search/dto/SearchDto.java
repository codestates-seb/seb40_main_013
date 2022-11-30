package gohome.dailydaily.domain.search.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;

public class SearchDto {

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class RankResponse implements Serializable {
        private String keyword;
        private Long count;
    }
}
