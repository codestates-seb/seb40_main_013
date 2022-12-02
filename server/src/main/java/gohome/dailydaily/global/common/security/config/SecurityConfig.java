package gohome.dailydaily.global.common.security.config;

import gohome.dailydaily.global.common.security.filter.CustomFilterConfigurer;
import gohome.dailydaily.global.common.security.handler.CustomAccessDeniedHandler;
import gohome.dailydaily.global.common.security.handler.CustomAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.http.HttpMethod.*;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final CustomAuthenticationEntryPoint authenticationEntryPoint;
    private final CustomFilterConfigurer customFilterConfigurer;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler)
                .authenticationEntryPoint(authenticationEntryPoint)
                .and()
                .apply(customFilterConfigurer)
                .and()
                .authorizeRequests()
                .antMatchers("/h2/*").permitAll()
                .mvcMatchers(POST, "/signup/**", "/login", "/guest").permitAll()
                .mvcMatchers(GET, "/members/mypage/**").hasRole("USER")
                .mvcMatchers(GET, "/orders/**").hasRole("USER")
                .mvcMatchers(POST, "/products/**").hasRole("SELLER")
                .mvcMatchers(POST, "/**").hasRole("USER")
                .mvcMatchers(PATCH, "/**").hasRole("USER")
                .mvcMatchers(DELETE, "/**").hasRole("USER")
                .anyRequest().permitAll()
                .and()
                .build();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedHeader(CorsConfiguration.ALL);
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://localhost:80");
        configuration.addAllowedOrigin("http://localhost");
        configuration.addAllowedOrigin("https://thunderous-kashata-a1b728.netlify.app/");
        configuration.addAllowedOrigin("http://seb40main013.s3-website.ap-northeast-2.amazonaws.com/");
        configuration.addAllowedOrigin("http://ec2-3-39-250-169.ap-northeast-2.compute.amazonaws.com/");
        configuration.setAllowedMethods(List.of("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}
