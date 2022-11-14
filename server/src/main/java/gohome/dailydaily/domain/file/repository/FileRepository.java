package gohome.dailydaily.domain.file.repository;

import gohome.dailydaily.domain.file.entity.File;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Repository
public interface FileRepository {
    File saveFile(MultipartFile multipartFile, String path) throws IOException;
}
