package gohome.dailydaily.domain.member.entity;

import lombok.Getter;

@Getter
public enum MemberRole {
    USER("유저"),
    SELLER("판매자"),
    ADMIN("관리자");

    private final String roleName;

    MemberRole(String roleName) {
        this.roleName = roleName;
    }
}