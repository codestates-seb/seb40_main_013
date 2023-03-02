package gohome.dailydaily.domain.file.repository;

import gohome.dailydaily.domain.file.entity.File;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

// 파일을 저장하는 인터페이스
// 로컬환경 + S3 환경 모두 구현하기 위해 인터페이스로 만들었습니다.
public interface FileRepository {
    File saveFile(MultipartFile multipartFile, String path) throws IOException;
}
