package gohome.dailydaily.domain.member.controller;

import gohome.dailydaily.domain.member.dto.MemberDto;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.mapper.MemberMapper;
import gohome.dailydaily.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members/mypage")
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @PatchMapping
    public MemberDto.UserResponse patchMember(@Valid @RequestBody MemberDto.Patch patch) {
        Long memberId = 1L; // 시큐리티 구현 필요
        Member member = memberService.updateMember(memberMapper.toMember(patch, memberId));
        return memberMapper.toResponse(member);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMember() {
        Long memberId = 1L; // 시큐리티 구현 필요
        memberService.deleteMember(memberId);
    }

}
