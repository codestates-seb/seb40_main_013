package gohome.dailydaily.global.common.security.dto;

import lombok.Getter;

@Getter
public class LoginDto {
    private String email;
    private String password;
    private boolean keepState;
}
