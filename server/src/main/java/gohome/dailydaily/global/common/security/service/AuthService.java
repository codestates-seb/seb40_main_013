package gohome.dailydaily.global.common.security.service;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberRole;
import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.global.common.security.util.JwtTokenizer;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public void verifyPassword(Long memberId, String password) {
        Member member = memberService.findVerifiedMember(memberId);

        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw new BusinessLogicException(ExceptionCode.PASSWORD_DOES_NOT_MATCH);
        }
    }

    public String getGuestAccessToken() {
        return jwtTokenizer.getGuestAccessToken();
    }

}
