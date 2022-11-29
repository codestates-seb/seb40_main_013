package gohome.dailydaily.domain.search.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
@Transactional
public class SearchRedisRepository {

    private final String key = "search";
    private final RedisTemplate<String, String> redisTemplate;
    private ZSetOperations<String, String> zSetOperations;

    @PostConstruct
    public void init() {
        zSetOperations = redisTemplate.opsForZSet();
    }

    public void addSearchCount(String keyword) {
        zSetOperations.incrementScore(key, keyword, 1D);
    }

    @Transactional(readOnly = true)
    public Set<ZSetOperations.TypedTuple<String>> getRankTop5() {
        return zSetOperations.reverseRangeWithScores(key, 0L, 4L);
    }

}
