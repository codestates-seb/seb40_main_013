package gohome.dailydaily.domain.file.service;

import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.file.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FileService {
    private final FileRepository fileRepository;

    // MultipartFile 과 파일경로를 입력받아 저장하는 메서드
    public File storeFile(MultipartFile multipartFile, String path) throws IOException {
        if (multipartFile == null || multipartFile.isEmpty()) {
            return null;
        }
        verifiedFilename(multipartFile.getOriginalFilename());

        return fileRepository.saveFile(multipartFile, path);
    }

    // 파일 이름과 형식 유효성을 검증하는 메서드
    private void verifiedFilename(String filename) {
        if (filename == null) {
            throw new IllegalStateException("잘못된 형식의 Filename 입니다.");
        }

        boolean matches = filename.matches("^[a-zA-Zㄱ-ㅎ가-힣-_]+\\.(jpg|JPG|png|PNG|jpeg|JPEG)$");
        if (!matches) {
            throw new IllegalStateException("잘못된 형식의 Filename 입니다.");
        }
    }
}
