package gohome.dailydaily.domain.search.scheduler;

import gohome.dailydaily.domain.search.repository.SearchRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SearchScheduler {

    private final SearchRedisRepository searchRedisRepository;

//    @Scheduled(fixedDelay = 3600_000) // 60분
    @Scheduled(fixedDelay = 600_000) // 10분
//    @Scheduled(fixedDelay = 60_000) // 1분
    public void updateSearchCount() {
        searchRedisRepository.update();
    }

}
