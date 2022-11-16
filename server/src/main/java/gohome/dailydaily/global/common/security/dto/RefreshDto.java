package gohome.dailydaily.global.common.security.dto;

import lombok.Getter;

@Getter
public class RefreshDto {
    private final int status = 200;
    private final String message = "Authenticated successfully";
}
