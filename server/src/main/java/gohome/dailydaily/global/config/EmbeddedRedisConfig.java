package gohome.dailydaily.global.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import redis.embedded.RedisServer;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Slf4j
@Configuration
public class EmbeddedRedisConfig {

    private RedisServer redisServer;

    @PostConstruct
    public void redisServer() {
        redisServer = RedisServer.builder()
                .setting("maxmemory 128M")
                .build();

        try {
            redisServer.start();
            log.info("Redis started on {}", redisServer.ports());
        } catch (Exception e) {
            log.error("Redis start Error: {}", e.getMessage());
        }
    }

    @PreDestroy
    public void stopRedis() {
        if (redisServer != null) {
            redisServer.stop();
            log.info("Redis stopped on Port: {}", redisServer.ports());
        }
    }

}
