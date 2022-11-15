package gohome.dailydaily.domain.file.config;

import gohome.dailydaily.domain.file.repository.FileRepository;
import gohome.dailydaily.domain.file.repository.LocalFileRepository;
import gohome.dailydaily.domain.file.repository.S3FileRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileConfig {

    // 로컬 환경일 때 FileRepository 의 구현클래스를 folderFileRepository 로 지정
    @Bean
    @ConditionalOnProperty(value = "env", havingValue = "local")
    public FileRepository localFileRepository() {
        return new LocalFileRepository();
    }

    @Bean
    @ConditionalOnProperty(value = "env", havingValue = "server")
    public FileRepository S3FileRepository() {
        return new S3FileRepository();
    }
}
