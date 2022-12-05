package gohome.dailydaily.domain.member.dto;

import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.member.entity.MemberStatus;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;

public class MemberDto {

    @Getter
    public static class UserSignup {
        @NotBlank
        @Pattern(regexp = "[A-Za-z가-힣\\d]{2,10}")
        private String nickname;
        @Email
        @NotNull
        private String email;
        @NotBlank
        @Pattern(regexp = "(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{8,20}")
        private String password;
    }

    @Getter
    public static class SellerSignup {
        @NotBlank
        @Pattern(regexp = "[A-Za-z가-힣\\d]{2,10}")
        private String nickname;
        @NotBlank
        @Pattern(regexp = "(\\d{3})-(\\d{2})-(\\d{5})")
        private String brandNumber;
        @Email
        @NotNull
        private String email;
        @NotBlank
        @Pattern(regexp = "(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{8,20}")
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class ImgRegistration {
        @NotNull
        private final MultipartFile img;
    }

    @Getter
    public static class Patch {
        @Pattern(regexp = "[A-Za-z가-힣\\d]{2,10}")
        private String nickname;

        @Pattern(regexp = "(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{8,20}")
        private String password;

        private String address;

        @Pattern(regexp = "01[016789]-\\d{3,4}-\\d{4}")
        private String phone;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class UserResponse implements Serializable {
        private Long memberId;
        private String nickname;
        private String email;
        private String address;
        private String phone;
        private MemberStatus memberStatus;
        private File img;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class SellerResponse implements Serializable {
        private Long sellerId;
        private Long memberId;
        private String nickname;
        private String brandNumber;
        private String email;
        private String address;
        private String phone;
        private MemberStatus memberStatus;
        private File img;
    }

}
