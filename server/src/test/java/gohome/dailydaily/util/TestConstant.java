package gohome.dailydaily.util;

import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.cart.entity.ProductCart;
import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberRole;
import gohome.dailydaily.domain.member.entity.MemberStatus;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.product.entity.Product;
import org.springframework.restdocs.headers.RequestHeadersSnippet;
import org.springframework.restdocs.operation.preprocess.OperationRequestPreprocessor;
import org.springframework.restdocs.operation.preprocess.OperationResponsePreprocessor;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;

public class TestConstant {
    public static final Member MEMBER = Member.builder()
            .id(1L)
            .email("test@test.com")
            .nickname("닉네임")
            .password("비밀번호")
            .address("주소")
            .phone("010-1234-5678")
            .memberStatus(MemberStatus.ACTIVE)
            .build();
    public static final Seller SELLER = Seller.builder()
            .id(1L)
            .brandNumber("53-215-6262463")
            .member(MEMBER)
            .build();

    public static final Product PRODUCT = Product.builder()
            .id(1L)
            .title("productTest")
            .content("test")
            .price(10000)
            .score(45)
            .seller(SELLER)
            .build();

    public static final Option OPTION = Option.builder()
            .id(1L)
            .price(10000)
            .product(PRODUCT).build();

    public static final OperationRequestPreprocessor REQUEST_PREPROCESSOR =
            preprocessRequest(
                    modifyUris()
                            .scheme("https")
                            .host("api.dailydaily.com")
                            .removePort(),
                    prettyPrint()
            );
    public static final OperationResponsePreprocessor RESPONSE_PREPROCESSOR = preprocessResponse(prettyPrint());

    public static final RequestHeadersSnippet REQUEST_HEADER_JWT = requestHeaders(
            headerWithName("Authorization").description("JWT 토큰")
    );

    public static final FieldDescriptor FWP_MEMBER_ID = fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버 식별자");
    public static final FieldDescriptor FWP_EMAIL = fieldWithPath("email").type(JsonFieldType.STRING).description("이메일");
    public static final FieldDescriptor FWP_NICKNAME = fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임");
    public static final FieldDescriptor FWP_ADDRESS = fieldWithPath("address").type(JsonFieldType.STRING).description("주소");
    public static final FieldDescriptor FWP_PHONE = fieldWithPath("phone").type(JsonFieldType.STRING).description("휴대폰 번호");
    public static final FieldDescriptor FWP_MEMBER_STATUS = fieldWithPath("memberStatus").type(JsonFieldType.STRING).description("멤버 상태");
    public static final FieldDescriptor FWP_PASSWORD = fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호");

    public static final ResponseFieldsSnippet MEMBER_RESPONSE_FIELDS = responseFields(
            FWP_MEMBER_ID, FWP_NICKNAME, FWP_EMAIL, FWP_ADDRESS, FWP_PHONE, FWP_MEMBER_STATUS
    );

    static {
        MEMBER.addRoles(MemberRole.USER);
        PRODUCT.addOptions(OPTION);
    }


}
