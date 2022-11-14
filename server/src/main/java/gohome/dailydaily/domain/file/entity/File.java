package gohome.dailydaily.domain.file.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class File {

    private String fileName;
    private String fullPath;

    public File(String fileName, String fullPath) {
        this.fileName = fileName;
        this.fullPath = fullPath;
    }
}
