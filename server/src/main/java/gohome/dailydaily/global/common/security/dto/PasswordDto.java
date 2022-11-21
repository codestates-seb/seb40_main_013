package gohome.dailydaily.global.common.security.dto;

import lombok.Getter;

@Getter
public class PasswordDto {

    private String password;

    @Getter
    public static class Response {
        private final int status = 200;
        private final String message = "Verification successfully";
    }

}
