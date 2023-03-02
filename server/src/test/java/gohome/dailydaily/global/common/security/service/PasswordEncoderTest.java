package gohome.dailydaily.global.common.security.service;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;

public class PasswordEncoderTest {

    private final PasswordEncoder passwordEncoder =
            PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @Test
    public void verifyPassword() throws Exception {
        // given
        String encode1 = passwordEncoder.encode("123");
        String encode2 = passwordEncoder.encode("321");

        // when
        boolean wantTrue = passwordEncoder.matches("123", encode1);
        boolean wantFalse = passwordEncoder.matches("123", encode2);

        // then
        assertThat(wantTrue).isTrue();
        assertThat(wantFalse).isFalse();
    }

}
