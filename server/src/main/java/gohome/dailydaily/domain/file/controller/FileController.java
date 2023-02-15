package gohome.dailydaily.domain.file.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;

@RestController
@RequiredArgsConstructor
@ConditionalOnProperty(value = "env", havingValue = "local")
public class FileController {

    // 파일을 저장할 URL 을 불러오는 메서드
    @GetMapping("/img")
    public ResponseEntity<Resource> getImg(@RequestParam String imgPath) throws MalformedURLException {
        UrlResource urlResource = new UrlResource("file:" + imgPath);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_PNG_VALUE)
                .body(urlResource);
    }
}
