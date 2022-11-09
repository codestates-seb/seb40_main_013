package gohome.dailydaily.domain.member.entity;

import lombok.Getter;

@Getter
public enum MemberRole {
    USER("ROLE_USER"),
    SELLER("ROLE_SELLER"),
    ADMIN("ROLE_ADMIN");

    private final String roleName;

    MemberRole(String roleName) {
        this.roleName = roleName;
    }
}