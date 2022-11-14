package gohome.dailydaily.util;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberRole;
import gohome.dailydaily.domain.member.entity.MemberStatus;
import org.springframework.restdocs.operation.preprocess.OperationRequestPreprocessor;
import org.springframework.restdocs.operation.preprocess.OperationResponsePreprocessor;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;

import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;

public class TestConstant {
    public static Member MEMBER = Member.builder()
            .id(1L)
            .email("test@test.com")
            .nickname("닉네임")
            .password("비밀번호")
            .address("주소")
            .phone("010-1234-5678")
            .memberStatus(MemberStatus.ACTIVE)
            .build();

    public static OperationRequestPreprocessor REQUEST_PREPROCESSOR =
            preprocessRequest(
                    modifyUris()
                            .scheme("https")
                            .host("api.dailydaily.com")
                            .removePort(),
                    prettyPrint()
            );
    public static OperationResponsePreprocessor RESPONSE_PREPROCESSOR = preprocessResponse(prettyPrint());

    public static FieldDescriptor FWP_MEMBER_ID = fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버 식별자");
    public static FieldDescriptor FWP_EMAIL = fieldWithPath("email").type(JsonFieldType.STRING).description("이메일");
    public static FieldDescriptor FWP_NICKNAME = fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임");
    public static FieldDescriptor FWP_ADDRESS = fieldWithPath("address").type(JsonFieldType.STRING).description("주소");
    public static FieldDescriptor FWP_PHONE = fieldWithPath("phone").type(JsonFieldType.STRING).description("휴대폰 번호");
    public static FieldDescriptor FWP_MEMBER_STATUS = fieldWithPath("memberStatus").type(JsonFieldType.STRING).description("멤버 상태");
    public static FieldDescriptor FWP_PASSWORD = fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호");

    public static ResponseFieldsSnippet MEMBER_RESPONSE_FIELDS = responseFields(
            FWP_MEMBER_ID, FWP_EMAIL, FWP_NICKNAME, FWP_ADDRESS, FWP_PHONE, FWP_MEMBER_STATUS
    );

    public TestConstant() {
        MEMBER.addRoles(MemberRole.USER);
    }

}
