package gohome.dailydaily.global.common.security.util;

import gohome.dailydaily.domain.member.entity.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserDetails extends Member implements UserDetails {

    private final CustomAuthorityUtils authorityUtils;

    public CustomUserDetails(Member member, CustomAuthorityUtils authorityUtils) {
        super(member.getId(), member.getEmail(), member.getNickname(),
                member.getPassword(), member.getAddress(), member.getPhone(),
                member.getMemberStatus(), member.getCart());
        this.addRoles(member.getRoles());
        this.authorityUtils = authorityUtils;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorityUtils.createAuthoritiesByEnum(getRoles());
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
