package gohome.dailydaily.domain.member.mapper;

import gohome.dailydaily.domain.member.dto.MemberDto;
import gohome.dailydaily.domain.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-14T16:27:10+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member toMember(MemberDto.UserSignup userSignup) {
        if ( userSignup == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.email( userSignup.getEmail() );
        member.nickname( userSignup.getNickname() );
        member.password( userSignup.getPassword() );

        return member.build();
    }

    @Override
    public Member toMember(MemberDto.Patch patch, Long memberId) {
        if ( patch == null && memberId == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        if ( patch != null ) {
            member.nickname( patch.getNickname() );
            member.password( patch.getPassword() );
            member.address( patch.getAddress() );
            member.phone( patch.getPhone() );
        }
        member.id( memberId );

        return member.build();
    }

    @Override
    public MemberDto.UserResponse toResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDto.UserResponse.UserResponseBuilder userResponse = MemberDto.UserResponse.builder();

        userResponse.memberId( member.getId() );
        userResponse.email( member.getEmail() );
        userResponse.nickname( member.getNickname() );
        userResponse.address( member.getAddress() );
        userResponse.phone( member.getPhone() );
        userResponse.memberStatus( member.getMemberStatus() );

        return userResponse.build();
    }
}
