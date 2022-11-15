package gohome.dailydaily.domain.file.repository;

import gohome.dailydaily.domain.file.entity.File;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


public class S3FileRepository implements FileRepository {

    @Override
    public File saveFile(MultipartFile multipartFile, String path) throws IOException {
        return null;
    }
}
