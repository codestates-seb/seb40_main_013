package gohome.dailydaily.domain.search.scheduler;

import gohome.dailydaily.domain.search.mapper.SearchMapper;
import gohome.dailydaily.domain.search.repository.SearchRedisRepository;
import gohome.dailydaily.domain.search.repository.SearchResRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class SearchScheduler {

    private final SearchMapper searchMapper;
    private final SearchRedisRepository searchRedisRepository;
    private final SearchResRedisRepository searchResRedisRepository;

    @Scheduled(fixedDelay = 600_000) // 10분
//    @Scheduled(fixedDelay = 60_000) // 1분
    public void updateSearchCount() {
        Set<ZSetOperations.TypedTuple<String>> rankTop5 = searchRedisRepository.getRankTop5();
        if (rankTop5.isEmpty()) {
            return;
        }

        searchResRedisRepository.updateTop5(searchMapper.toResponse(rankTop5));
        searchRedisRepository.deleteSearchCount();
    }

}
