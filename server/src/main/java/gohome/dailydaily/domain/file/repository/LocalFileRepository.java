package gohome.dailydaily.domain.file.repository;

import gohome.dailydaily.domain.file.entity.File;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

// 로컬 환경에서 파일을 저장하는 FileRepository 구현클래스
public class LocalFileRepository implements FileRepository {

    @Override
    public File saveFile(MultipartFile multipartFile, String path) throws IOException {

        String originalFilename = multipartFile.getOriginalFilename();
        String storeFilename = getStoreFileName(originalFilename);
        String fullPath = path + storeFilename;

        multipartFile.transferTo(new java.io.File(fullPath));
        return new File(originalFilename, fullPath);
    }

    private String getStoreFileName(String originalFilename) {
        UUID uuid = UUID.randomUUID();
        String ext = getExt(originalFilename);
        return uuid + "." + ext;
    }

    private static String getExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos+1);
    }
}
