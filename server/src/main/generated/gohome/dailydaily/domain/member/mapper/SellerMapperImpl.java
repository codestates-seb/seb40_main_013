package gohome.dailydaily.domain.member.mapper;

import gohome.dailydaily.domain.member.dto.MemberDto;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberStatus;
import gohome.dailydaily.domain.member.entity.Seller;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-14T16:27:08+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class SellerMapperImpl implements SellerMapper {

    @Override
    public Seller toSeller(MemberDto.SellerSignup sellerSignup) {
        if ( sellerSignup == null ) {
            return null;
        }

        Seller.SellerBuilder seller = Seller.builder();

        seller.member( sellerSignupToMember( sellerSignup ) );
        seller.brandNumber( sellerSignup.getBrandNumber() );

        return seller.build();
    }

    @Override
    public MemberDto.SellerResponse toResponse(Seller seller) {
        if ( seller == null ) {
            return null;
        }

        MemberDto.SellerResponse.SellerResponseBuilder sellerResponse = MemberDto.SellerResponse.builder();

        sellerResponse.sellerId( seller.getId() );
        sellerResponse.memberId( sellerMemberId( seller ) );
        sellerResponse.email( sellerMemberEmail( seller ) );
        sellerResponse.nickname( sellerMemberNickname( seller ) );
        sellerResponse.address( sellerMemberAddress( seller ) );
        sellerResponse.phone( sellerMemberPhone( seller ) );
        sellerResponse.memberStatus( sellerMemberMemberStatus( seller ) );
        sellerResponse.brandNumber( seller.getBrandNumber() );

        return sellerResponse.build();
    }

    protected Member sellerSignupToMember(MemberDto.SellerSignup sellerSignup) {
        if ( sellerSignup == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.email( sellerSignup.getEmail() );
        member.nickname( sellerSignup.getNickname() );
        member.password( sellerSignup.getPassword() );

        return member.build();
    }

    private Long sellerMemberId(Seller seller) {
        if ( seller == null ) {
            return null;
        }
        Member member = seller.getMember();
        if ( member == null ) {
            return null;
        }
        Long id = member.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String sellerMemberEmail(Seller seller) {
        if ( seller == null ) {
            return null;
        }
        Member member = seller.getMember();
        if ( member == null ) {
            return null;
        }
        String email = member.getEmail();
        if ( email == null ) {
            return null;
        }
        return email;
    }

    private String sellerMemberNickname(Seller seller) {
        if ( seller == null ) {
            return null;
        }
        Member member = seller.getMember();
        if ( member == null ) {
            return null;
        }
        String nickname = member.getNickname();
        if ( nickname == null ) {
            return null;
        }
        return nickname;
    }

    private String sellerMemberAddress(Seller seller) {
        if ( seller == null ) {
            return null;
        }
        Member member = seller.getMember();
        if ( member == null ) {
            return null;
        }
        String address = member.getAddress();
        if ( address == null ) {
            return null;
        }
        return address;
    }

    private String sellerMemberPhone(Seller seller) {
        if ( seller == null ) {
            return null;
        }
        Member member = seller.getMember();
        if ( member == null ) {
            return null;
        }
        String phone = member.getPhone();
        if ( phone == null ) {
            return null;
        }
        return phone;
    }

    private MemberStatus sellerMemberMemberStatus(Seller seller) {
        if ( seller == null ) {
            return null;
        }
        Member member = seller.getMember();
        if ( member == null ) {
            return null;
        }
        MemberStatus memberStatus = member.getMemberStatus();
        if ( memberStatus == null ) {
            return null;
        }
        return memberStatus;
    }
}
