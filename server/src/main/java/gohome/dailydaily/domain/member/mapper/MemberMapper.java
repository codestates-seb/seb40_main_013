package gohome.dailydaily.domain.member.mapper;

import gohome.dailydaily.domain.member.dto.MemberDto;
import gohome.dailydaily.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    Member toMember(MemberDto.UserSignup userSignup);

    Member toMember(MemberDto.Patch patch, Long memberId);

    @Mapping(target = "memberId", source = "id")
    MemberDto.UserResponse toResponse(Member member);

}
