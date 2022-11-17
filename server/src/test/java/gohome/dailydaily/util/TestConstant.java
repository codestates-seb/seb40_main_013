package gohome.dailydaily.util;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberRole;
import gohome.dailydaily.domain.member.entity.MemberStatus;
import gohome.dailydaily.domain.review.entity.Review;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.restdocs.headers.RequestHeadersSnippet;
import org.springframework.restdocs.operation.preprocess.OperationRequestPreprocessor;
import org.springframework.restdocs.operation.preprocess.OperationResponsePreprocessor;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.RequestParametersSnippet;

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.JsonFieldType.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;

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

    public static final Pageable PAGEABLE = PageRequest.of(0, 20, Sort.by("createdAt").descending());

    public static final Review REVIEW1 = Review.builder()
            .id(1L)
            .title("리뷰 제목1")
            .content("리뷰 내용1")
            .score(50)
            .build();
    public static final Review REVIEW2 = Review.builder()
            .id(2L)
            .title("리뷰 제목2")
            .content("리뷰 내용2")
            .score(35)
            .build();

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

    public static final RequestParametersSnippet REQUEST_PARAMETERS_PAGE = requestParameters(
            parameterWithName("page").description("페이지"),
            parameterWithName("size").description("사이즈"),
            parameterWithName("sort").description("정렬 기준")
    );

    public static final FieldDescriptor FWP_MEMBER_ID = fieldWithPath("memberId").type(NUMBER).description("멤버 식별자");
    public static final FieldDescriptor FWP_EMAIL = fieldWithPath("email").type(STRING).description("이메일");
    public static final FieldDescriptor FWP_NICKNAME = fieldWithPath("nickname").type(STRING).description("닉네임");
    public static final FieldDescriptor FWP_ADDRESS = fieldWithPath("address").type(STRING).description("주소");
    public static final FieldDescriptor FWP_PHONE = fieldWithPath("phone").type(STRING).description("휴대폰 번호");
    public static final FieldDescriptor FWP_MEMBER_STATUS = fieldWithPath("memberStatus").type(STRING).description("멤버 상태");
    public static final FieldDescriptor FWP_PASSWORD = fieldWithPath("password").type(STRING).description("비밀번호");

    public static final ResponseFieldsSnippet MEMBER_RESPONSE_FIELDS = responseFields(
            FWP_MEMBER_ID, FWP_NICKNAME, FWP_EMAIL, FWP_ADDRESS, FWP_PHONE, FWP_MEMBER_STATUS
    );


    public static final FieldDescriptor FWP_CONTENT = fieldWithPath("content").type(ARRAY).description("데이터");

    public static final FieldDescriptor FWP_SLICE_INFO = fieldWithPath("sliceInfo").type(OBJECT).description("슬라이스 정보");
    public static final FieldDescriptor FWP_SLICE_INFO_PAGE = fieldWithPath("sliceInfo.page").type(NUMBER).description("페이지");
    public static final FieldDescriptor FWP_SLICE_INFO_SIZE = fieldWithPath("sliceInfo.size").type(NUMBER).description("사이즈");
    public static final FieldDescriptor FWP_SLICE_INFO_HAS_NEXT = fieldWithPath("sliceInfo.hasNext").type(BOOLEAN).description("다음 슬라이스 존재 여부");

    public static final FieldDescriptor FWP_PAGE_INFO = fieldWithPath("pageInfo").type(OBJECT).description("페이지 정보");
    public static final FieldDescriptor FWP_PAGE_INFO_PAGE = fieldWithPath("pageInfo.page").type(NUMBER).description("페이지");
    public static final FieldDescriptor FWP_PAGE_INFO_SIZE = fieldWithPath("pageInfo.size").type(NUMBER).description("사이즈");
    public static final FieldDescriptor FWP_PAGE_INFO_TOTAL_ELEMENTS = fieldWithPath("pageInfo.totalElements").type(NUMBER).description("총 원소 개수");
    public static final FieldDescriptor FWP_PAGE_INFO_TOTAL_PAGES = fieldWithPath("pageInfo.totalPages").type(NUMBER).description("총 페이지 개수");

    public static final FieldDescriptor FWP_CONTENT_REVIEW_ID = fieldWithPath("content[].reviewId").type(NUMBER).description("리뷰 식별자");
    public static final FieldDescriptor FWP_CONTENT_REVIEW_TITLE = fieldWithPath("content[].title").type(STRING).description("리뷰 제목");
    public static final FieldDescriptor FWP_CONTENT_REVIEW_CONTENT = fieldWithPath("content[].content").type(STRING).description("리뷰 내용");
    public static final FieldDescriptor FWP_CONTENT_REVIEW_SCORE = fieldWithPath("content[].score").type(NUMBER).description("리뷰 별점");


    public TestConstant() {
        MEMBER.addRoles(MemberRole.USER);
    }

}
