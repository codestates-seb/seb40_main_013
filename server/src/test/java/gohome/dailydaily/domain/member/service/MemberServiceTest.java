package gohome.dailydaily.domain.member.service;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberRole;
import gohome.dailydaily.domain.member.entity.MemberStatus;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.member.repository.MemberRepository;
import gohome.dailydaily.domain.member.repository.SellerRepository;
import gohome.dailydaily.global.error.BusinessLogicException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private SellerRepository sellerRepository;

    @InjectMocks
    private MemberService memberService;

    private Member member;

    @BeforeEach
    public void init() {
        member = Member.builder()
                .nickname("닉네임")
                .password("비밀번호")
                .email("test@test.com")
                .build();
    }

    @Test
    public void createMember() throws Exception {
        // given
        given(passwordEncoder.encode(anyString()))
                .willAnswer(AdditionalAnswers.returnsFirstArg());
        given(memberRepository.save(any(Member.class)))
                .willAnswer(AdditionalAnswers.returnsFirstArg());

        // when
        memberService.createMember(member);

        // then
        assertThat(member.getMemberStatus()).isEqualTo(MemberStatus.ACTIVE);
        assertThat(member.getRoles().size()).isEqualTo(1);
        assertThat(member.getRoles().get(0)).isEqualTo(MemberRole.USER);
    }

    @Test
    public void createSeller() throws Exception {
        // given
        Seller seller = Seller.builder()
                .brandNumber("12345")
                .member(member)
                .build();

        given(passwordEncoder.encode(anyString()))
                .willAnswer(AdditionalAnswers.returnsFirstArg());
        given(sellerRepository.save(any(Seller.class)))
                .willAnswer(AdditionalAnswers.returnsFirstArg());

        // when
        memberService.createSeller(seller);

        // then
        assertThat(member.getMemberStatus()).isEqualTo(MemberStatus.ACTIVE);
        assertThat(member.getRoles().size()).isEqualTo(2);
        assertThat(member.getRoles()).contains(MemberRole.USER);
        assertThat(member.getRoles()).contains(MemberRole.SELLER);
    }

    @Test
    public void updateMember() throws Exception {
        // given
        Member patchMember = Member.builder()
                .id(1L)
                .email("patch@test.com")
                .nickname("닉네임")
                .password("비밀번호")
                .address("주소")
                .phone("010-1234-5678")
                .build();

        given(memberRepository.findById(1L))
                .willReturn(Optional.of(member));

        // when
        memberService.updateMember(patchMember);

        // then
        assertThat(member.getEmail()).isEqualTo(patchMember.getEmail());
        assertThat(member.getNickname()).isEqualTo(patchMember.getNickname());
        assertThat(member.getPassword()).isEqualTo(patchMember.getPassword());
        assertThat(member.getAddress()).isEqualTo(patchMember.getAddress());
        assertThat(member.getPhone()).isEqualTo(patchMember.getPhone());
    }

    @Test
    public void updateMemberNull() throws Exception {
        // given
        Member patchMember = Member.builder()
                .id(1L)
                .email(null)
                .nickname(null)
                .password(null)
                .build();

        given(memberRepository.findById(1L))
                .willReturn(Optional.of(member));

        // when
        memberService.updateMember(patchMember);

        // then
        assertThat(member.getEmail()).isNotNull();
        assertThat(member.getNickname()).isNotNull();
        assertThat(member.getPassword()).isNotNull();
    }
    
    @Test
    public void checkEmailAndNickname() throws Exception {
        // given
        Member existingEmailMember = Member.builder()
                .email("existingEmail@test.com")
                .nickname(member.getNickname())
                .password("1234")
                .build();
        Member existingNicknameMember = Member.builder()
                .email(member.getEmail())
                .nickname("existingNickname")
                .password("1234")
                .build();

        given(memberRepository.existsByEmail(existingEmailMember.getEmail()))
                .willReturn(true);
        given(memberRepository.existsByNickname(existingNicknameMember.getNickname()))
                .willReturn(true);
        given(memberRepository.existsByEmail(member.getEmail()))
                .willReturn(false);
        given(memberRepository.existsByNickname(member.getNickname()))
                .willReturn(false);

        // when
        memberService.createMember(member);

        // then
        assertThrows(BusinessLogicException.class,
                () -> memberService.createMember(existingEmailMember));
        assertThrows(BusinessLogicException.class,
                () -> memberService.createMember(existingNicknameMember));
    }

}