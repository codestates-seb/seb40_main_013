package gohome.dailydaily.global.common.security.filter;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.repository.MemberRepository;
import gohome.dailydaily.global.common.security.util.CustomAuthorityUtils;
import gohome.dailydaily.global.common.security.util.JwtTokenizer;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
public class RefreshVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Claims claims = verifyJws(request);
            Member member = verifyMember(claims);
            String accessToken = delegateAccessToken(claims, member);
            response.setHeader("Authorization", "Bearer " + accessToken);
            setAuthenticationToContext(member);
        } catch (Exception exception) {
            request.setAttribute("exception", exception);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String refresh = request.getHeader("Refresh");
        String authorization = request.getHeader("Authorization");
        return refresh == null || (authorization != null && authorization.startsWith("Bearer"));
    }

    private Claims verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Refresh");
        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
    }

    private Member verifyMember(Claims claims) {
        Long id = Long.parseLong(claims.getSubject());
        return memberRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private String delegateAccessToken(Claims claims, Member member) {
        claims.put("roles", member.getRoles());

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String bases64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, claims.getSubject(), expiration, bases64EncodedSecretKey);
    }

    private void setAuthenticationToContext(Member member) {
        List<GrantedAuthority> authorities = authorityUtils.createAuthoritiesByEnum(member.getRoles());
        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
