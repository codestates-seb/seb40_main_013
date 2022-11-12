package gohome.dailydaily.global.common.security.controller;

import gohome.dailydaily.domain.member.dto.MemberDto;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.member.mapper.MemberMapper;
import gohome.dailydaily.domain.member.mapper.SellerMapper;
import gohome.dailydaily.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
public class LoginController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final SellerMapper sellerMapper;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public MemberDto.UserResponse signup(@Valid @RequestBody MemberDto.UserSignup userSignup) {
        Member member = memberService.createMember(memberMapper.toMember(userSignup));
        return memberMapper.toResponse(member);
    }

    @PostMapping("/signup/seller")
    @ResponseStatus(HttpStatus.CREATED)
    public MemberDto.SellerResponse sellerSignup(@Valid @RequestBody MemberDto.SellerSignup sellerSignup) {
        Seller seller = memberService.createSeller(sellerMapper.toSeller(sellerSignup));
        return sellerMapper.toResponse(seller);
    }

}
