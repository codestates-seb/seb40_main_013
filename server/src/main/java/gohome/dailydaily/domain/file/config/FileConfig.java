package gohome.dailydaily.domain.file.config;

import gohome.dailydaily.domain.file.repository.FileRepository;
import gohome.dailydaily.domain.file.repository.FolderFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileConfig {

    // 로컬 환경일 때 FileRepository 의 구현클래스를 folderFileRepository 로 지정
    @Bean
    @ConditionalOnProperty(value = "env", havingValue = "local")
    public FileRepository folderFileRepository() {
        return new FolderFileRepository();
    }
}
