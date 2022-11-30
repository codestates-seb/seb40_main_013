package gohome.dailydaily;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableJpaAuditing
@SpringBootApplication
public class DailydailyApplication {

	public static void main(String[] args) {
		SpringApplication.run(DailydailyApplication.class, args);
	}

}
