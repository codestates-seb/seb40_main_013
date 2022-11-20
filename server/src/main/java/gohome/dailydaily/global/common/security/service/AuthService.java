package gohome.dailydaily.global.common.security.service;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    public void verifyPassword(Long memberId, String password) {
        Member member = memberService.findVerifiedMember(memberId);
        String encode = passwordEncoder.encode(password);

        if (!member.getPassword().equals(encode)) {
            throw new BusinessLogicException(ExceptionCode.PASSWORD_DOES_NOT_MATCH);
        }
    }
}
