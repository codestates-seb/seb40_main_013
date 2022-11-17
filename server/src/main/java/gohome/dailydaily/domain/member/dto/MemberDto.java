package gohome.dailydaily.domain.member.dto;

import gohome.dailydaily.domain.member.entity.MemberStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class MemberDto {

    @Getter
    public static class UserSignup {
        @NotBlank
        private String nickname;
        @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Getter
    public static class SellerSignup {
        @NotBlank
        private String nickname;
        @NotBlank
        private String brandNumber;
        @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Getter
    public static class Patch {
        private String nickname;
        private String password;
        private String address;
        private String phone;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class UserResponse {
        private Long memberId;
        private String nickname;
        private String email;
        private String address;
        private String phone;
        private MemberStatus memberStatus;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class SellerResponse {
        private Long sellerId;
        private Long memberId;
        private String nickname;
        private String brandNumber;
        private String email;
        private String address;
        private String phone;
        private MemberStatus memberStatus;
    }

}
