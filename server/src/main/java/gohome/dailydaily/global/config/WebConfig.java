package gohome.dailydaily.global.config;

import gohome.dailydaily.global.common.security.resolver.MemberIdResolver;
import gohome.dailydaily.global.common.security.resolver.MemberResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final MemberResolver memberResolver;
    private final MemberIdResolver memberIdResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.addAll(List.of(memberResolver, memberIdResolver));
    }
}
