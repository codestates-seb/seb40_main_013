package gohome.dailydaily.global.common.security.filter;

import gohome.dailydaily.global.common.security.util.CustomAuthorityUtils;
import gohome.dailydaily.global.common.security.util.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final AuthenticationSuccessHandler authenticationSuccessHandler;
    private final AuthenticationFailureHandler authenticationFailureHandler;

    @Override
    public void configure(HttpSecurity builder) {
        AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtTokenizer, authenticationManager);
        jwtAuthenticationFilter.setFilterProcessesUrl("/login");
        jwtAuthenticationFilter.setAuthenticationSuccessHandler(authenticationSuccessHandler);
        jwtAuthenticationFilter.setAuthenticationFailureHandler(authenticationFailureHandler);

        builder
                .addFilter(jwtAuthenticationFilter)
                .addFilterAfter(new JwtVerificationFilter(jwtTokenizer, authorityUtils), JwtAuthenticationFilter.class);
    }
}
