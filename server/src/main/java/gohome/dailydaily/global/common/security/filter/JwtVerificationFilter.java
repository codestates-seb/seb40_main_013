package gohome.dailydaily.global.common.security.filter;

import gohome.dailydaily.global.common.security.handler.ErrorResponder;
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
import java.util.List;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Claims claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (Exception exception) {
            request.setAttribute("exception", exception);
            ErrorResponder.sendErrorResponse(response, response.SC_UNAUTHORIZED, exception.getMessage());
            //ErrorResponder.sendErrorResponse(response, response.SC_UNAUTHORIZED, "Access Token Error: " + exception.getMessage());

            return;
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Claims verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
    }

    @SuppressWarnings("unchecked")
    private void setAuthenticationToContext(Claims claims) {
        Long id = Long.parseLong(claims.getSubject());
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List<String>) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(id, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
