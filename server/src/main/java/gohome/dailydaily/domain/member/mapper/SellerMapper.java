package gohome.dailydaily.domain.member.mapper;

import gohome.dailydaily.domain.member.dto.MemberDto;
import gohome.dailydaily.domain.member.entity.Seller;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SellerMapper {

    @Mapping(target = "member", source = ".")
    Seller toSeller(MemberDto.SellerSignup sellerSignup);

    @Mapping(target = "sellerId", source = "id")
    @Mapping(target = "memberId", source = "member.id")
    @Mapping(target = ".", source = "member")
    MemberDto.SellerResponse toResponse(Seller seller);

}
