package gohome.dailydaily.domain.member.controller;

import gohome.dailydaily.domain.member.dto.MemberDto.*;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.member.mapper.MemberMapper;
import gohome.dailydaily.domain.member.mapper.SellerMapper;
import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.global.common.security.resolver.MemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final SellerMapper sellerMapper;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse signup(@Valid @RequestBody UserSignup userSignup) {
        Member member = memberService.createMember(memberMapper.toMember(userSignup));
        return memberMapper.toResponse(member);
    }

    @PostMapping("/signup/seller")
    @ResponseStatus(HttpStatus.CREATED)
    public SellerResponse sellerSignup(@Valid @RequestBody SellerSignup sellerSignup) {
        Seller seller = memberService.createSeller(sellerMapper.toSeller(sellerSignup));
        return sellerMapper.toResponse(seller);
    }

    @GetMapping("/members/mypage")
    public UserResponse getMember(@MemberId Long memberId) {
        Member member = memberService.findVerifiedMember(memberId);
        return memberMapper.toResponse(member);
    }

    @PatchMapping("/members/mypage")
    public UserResponse patchMember(@MemberId Long memberId,
                                    @Valid @RequestBody Patch patch) {
        Member member = memberService.updateMember(memberMapper.toMember(patch, memberId));
        return memberMapper.toResponse(member);
    }

    @DeleteMapping("/members/mypage")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMember(@MemberId Long memberId) {
        memberService.deleteMember(memberId);
    }

}
