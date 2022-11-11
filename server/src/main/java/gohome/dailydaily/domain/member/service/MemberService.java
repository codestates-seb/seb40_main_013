package gohome.dailydaily.domain.member.service;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberRole;
import gohome.dailydaily.domain.member.entity.MemberStatus;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.member.repository.MemberRepository;
import gohome.dailydaily.domain.member.repository.SellerRepository;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final SellerRepository sellerRepository;
    private final PasswordEncoder passwordEncoder;

    public Member createMember(Member member) {
        checkEmailAndNickname(member);
        member.initInfo(passwordEncoder.encode(member.getPassword()));
        member.addRoles(MemberRole.USER);
        return memberRepository.save(member);
    }

    public Seller createSeller(Seller seller) {
        Member member = seller.getMember();
        checkEmailAndNickname(member);
        member.initInfo(passwordEncoder.encode(member.getPassword()));
        member.addRoles(MemberRole.USER, MemberRole.SELLER);
        return sellerRepository.save(seller);
    }

    public Member updateMember(Member member) {
        Member verifiedMember = findVerifiedMember(member.getId());
        checkEmailAndNickname(member);

        if (member.getPassword() != null) {
            verifiedMember.updateInfo(member, passwordEncoder.encode(member.getPassword()));
        } else {
            verifiedMember.updateInfo(member, null);
        }

        return verifiedMember;
    }

    public void deleteMember(Long memberId) {
        Member verifiedMember = findVerifiedMember(memberId);
        verifiedMember.updateStatus(MemberStatus.QUIT);
    }

    private void checkEmailAndNickname(Member member) {
        if (memberRepository.existsByEmail(member.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXISTS);
        }
        if (memberRepository.existsByNickname(member.getNickname())) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_ALREADY_EXISTS);
        }
    }

    public Member findVerifiedMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

}
