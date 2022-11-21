package gohome.dailydaily.util.security;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.springframework.http.HttpMethod.*;

@TestConfiguration
public class SecurityTestConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .authorizeRequests()
                .mvcMatchers(POST, "/signup/**", "/login").permitAll()
                .mvcMatchers(POST, "/**").hasRole("USER")
                .mvcMatchers(PATCH, "/**").hasRole("USER")
                .mvcMatchers(DELETE, "/**").hasRole("USER")
                .anyRequest().permitAll()
                .and()
                .build();
    }
//    @PersistenceContext
//    private EntityManager entityManager;
//
//    @Bean
//    public JPAQueryFactory jpaQueryFactory(){
//        return new JPAQueryFactory(entityManager);
//    }

}
