package gohome.dailydaily.domain.search.scheduler;

import gohome.dailydaily.domain.search.repository.SearchRedisRepository;
import gohome.dailydaily.global.error.logging.DiscordWebhook;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class SearchScheduler {

    @Value("${webhook.status}")
    private String url;
    private DiscordWebhook webhook;
    private final SearchRedisRepository searchRedisRepository;

    @PostConstruct
    public void init() {
        this.webhook = new DiscordWebhook(url);
        this.webhook.setContent("서버 정상 작동 중😄");
    }

    //    @Scheduled(fixedDelay = 3_600_000) // 60분
    @Scheduled(fixedDelay = 1_200_000) // 20분
//    @Scheduled(fixedDelay = 600_000) // 10분
//    @Scheduled(fixedDelay = 60_000) // 1분
    public void updateSearchCount() throws IOException {
        searchRedisRepository.update();

        webhook.execute();
    }

}
