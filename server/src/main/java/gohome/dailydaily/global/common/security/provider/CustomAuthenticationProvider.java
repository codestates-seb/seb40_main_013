package gohome.dailydaily.global.common.security.provider;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.repository.MemberRepository;
import gohome.dailydaily.global.common.security.util.CustomAuthorityUtils;
import gohome.dailydaily.global.common.security.util.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        UsernamePasswordAuthenticationToken authToken = (UsernamePasswordAuthenticationToken) authentication;

        String email = authToken.getName();
        Optional.ofNullable(email)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid Email or Password"));

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid Email or Password"));

        String password = member.getPassword();
        if (!passwordEncoder.matches((String) authToken.getCredentials(), password)) {
            throw new BadCredentialsException("Invalid Email or Password");
        }

        List<GrantedAuthority> authorities = authorityUtils.createAuthoritiesByEnum(member.getRoles());

        return new UsernamePasswordAuthenticationToken(new CustomUserDetails(member, authorityUtils), password, authorities);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.equals(authentication);
    }
}
