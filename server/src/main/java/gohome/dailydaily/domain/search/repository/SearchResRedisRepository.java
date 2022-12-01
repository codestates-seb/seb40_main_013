package gohome.dailydaily.domain.search.repository;

import gohome.dailydaily.domain.search.dto.SearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Transactional
public class SearchResRedisRepository {

    private final RedisTemplate<String, List<SearchDto.RankResponse>> redisTemplate;

    private final String key = "searchResponse";
    private final String hashKey = "top5";
    private HashOperations<String, String, List<SearchDto.RankResponse>> hashOperations;

    @PostConstruct
    public void init() {
        hashOperations = redisTemplate.opsForHash();
    }

    @Transactional(readOnly = true)
    public List<SearchDto.RankResponse> getTop5Responses() {
        List<SearchDto.RankResponse> rankResponses = hashOperations.get(key, hashKey);
        if (rankResponses == null) {
            return new ArrayList<>();
        }
        return rankResponses;
    }

    public void updateTop5(List<SearchDto.RankResponse> responses) {
        hashOperations.put(key, hashKey, responses);
    }

}
