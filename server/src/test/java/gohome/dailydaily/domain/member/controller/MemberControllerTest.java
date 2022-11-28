package gohome.dailydaily.domain.member.controller;

import com.google.gson.Gson;
import gohome.dailydaily.domain.like.service.LikeService;
import gohome.dailydaily.domain.member.dto.MemberDto;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberStatus;
import gohome.dailydaily.domain.member.mapper.MemberMapper;
import gohome.dailydaily.domain.member.mapper.SellerMapper;
import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.domain.review.entity.Review;
import gohome.dailydaily.domain.review.mapper.ReviewMapper;
import gohome.dailydaily.domain.review.service.ReviewService;
import gohome.dailydaily.util.Reflection;
import gohome.dailydaily.util.security.SecurityTestConfig;
import gohome.dailydaily.util.security.WithMockCustomUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static gohome.dailydaily.util.TestConstant.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {MemberController.class, MemberMapper.class, SellerMapper.class, ReviewMapper.class})
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityTestConfig.class)
@AutoConfigureRestDocs
@WithMockCustomUser
class MemberControllerTest implements Reflection {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private MemberService memberService;
    @MockBean
    private ReviewService reviewService;

    @MockBean
    private LikeService likeService;

    @Test
    public void signup() throws Exception {
        // given
        MemberDto.UserSignup signup = newInstance(MemberDto.UserSignup.class);
        setField(signup, "nickname", "닉네임");
        setField(signup, "email", "test@test.com");
        setField(signup, "password", "test1password!");

        Member member = Member.builder()
                .id(1L)
                .nickname(signup.getNickname())
                .email(signup.getEmail())
                .memberStatus(MemberStatus.ACTIVE)
                .build();

        String request = gson.toJson(signup);

        given(memberService.createMember(any(Member.class)))
                .willReturn(member);

        // when
        ResultActions actions = mockMvc.perform(
                post("/signup")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request)
        );

        // then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.memberId").value(member.getId()))
                .andExpect(jsonPath("$.email").value(member.getEmail()))
                .andExpect(jsonPath("$.nickname").value(member.getNickname()))
                .andExpect(jsonPath("$.address").value(member.getAddress()))
                .andExpect(jsonPath("$.phone").value(member.getPhone()))
                .andExpect(jsonPath("$.memberStatus").value(member.getMemberStatus().name()))
                .andDo(document("members/signup",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        requestFields(
                                FWP_NICKNAME, FWP_EMAIL, FWP_PASSWORD
                        ),
                        responseFields(
                                FWP_MEMBER_ID, FWP_NICKNAME, FWP_EMAIL,
                                fieldWithPath("address").type(JsonFieldType.NULL).description("주소"),
                                fieldWithPath("phone").type(JsonFieldType.NULL).description("휴대폰 번호"),
                                fieldWithPath("img").type(JsonFieldType.NULL).description("이미지"),
                                FWP_MEMBER_STATUS
                        )
                ));
    }

    @Test
    public void getMember() throws Exception {
        // given
        given(memberService.findVerifiedMember(MEMBER.getId()))
                .willReturn(MEMBER);

        // when
        ResultActions actions = mockMvc.perform(
                get("/members/mypage")
                        .header("Authorization", "JWT")
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.memberId").value(MEMBER.getId()))
                .andExpect(jsonPath("$.email").value(MEMBER.getEmail()))
                .andExpect(jsonPath("$.nickname").value(MEMBER.getNickname()))
                .andExpect(jsonPath("$.address").value(MEMBER.getAddress()))
                .andExpect(jsonPath("$.phone").value(MEMBER.getPhone()))
                .andExpect(jsonPath("$.memberStatus").value(MEMBER.getMemberStatus().name()))
                .andDo(document("members/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        MEMBER_RESPONSE_FIELDS
                ));
    }

    @Test
    public void patchMember() throws Exception {
        // given
        MemberDto.Patch patch = newInstance(MemberDto.Patch.class);
        setField(patch, "nickname", MEMBER.getNickname());
        setField(patch, "password", MEMBER.getPassword());
        setField(patch, "address", MEMBER.getAddress());
        setField(patch, "phone", MEMBER.getPhone());

        String request = gson.toJson(patch);

        given(memberService.updateMember(any(Member.class)))
                .willReturn(MEMBER);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/members/mypage")
                        .header("Authorization", "JWT")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request)
        );

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.memberId").value(MEMBER.getId()))
                .andExpect(jsonPath("$.email").value(MEMBER.getEmail()))
                .andExpect(jsonPath("$.nickname").value(MEMBER.getNickname()))
                .andExpect(jsonPath("$.address").value(MEMBER.getAddress()))
                .andExpect(jsonPath("$.phone").value(MEMBER.getPhone()))
                .andExpect(jsonPath("$.memberStatus").value(MEMBER.getMemberStatus().name()))
                .andDo(document("members/patch",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        requestFields(
                                FWP_NICKNAME, FWP_PASSWORD, FWP_ADDRESS, FWP_PHONE
                        ),
                        MEMBER_RESPONSE_FIELDS
                ));
    }

    @Test
    public void deleteMember() throws Exception {
        // given
        doNothing().when(memberService).deleteMember(anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/members/mypage")
                        .header("Authorization", "JWT")
        );

        // then
        actions.andExpect(status().isNoContent())
                .andDo(document("members/delete",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT
                ));
    }

    @Test
    public void getReviewsByMemberId() throws Exception {
        // given
        Page<Review> reviews = new PageImpl<>(List.of(REVIEW1, REVIEW2), PAGEABLE, 2);

        given(reviewService.findReviewsByMemberId(MEMBER.getId(), PAGEABLE))
                .willReturn(reviews);

        // when
        ResultActions actions = mockMvc.perform(
                get("/members/mypage/reviews")
                        .param("page", String.valueOf(PAGEABLE.getPageNumber()))
                        .param("size", String.valueOf(PAGEABLE.getPageSize()))
                        .param("sort", String.valueOf(PAGEABLE.getSort()).replace(": ", ","))
                        .header("Authorization", "JWT")
        );

        // then
        actions.andExpect(status().isOk())
                .andDo(document("members/reviews",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        REQUEST_PARAM_PAGE,
                        PAGE_REVIEW_RESPONSE_FIELDS
                ));
    }

    @Test
    void patchMemberImg() throws Exception {
        // given
        given(memberService.updateMemberImg(any(MemberDto.ImgRegistration.class), eq(MEMBER.getId())))
                .willReturn(MEMBER);

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/members/img")
                        .file(IMG)
                        .header("Authorization", "JWT")
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.memberId").value(MEMBER.getId()))
                .andExpect(jsonPath("$.email").value(MEMBER.getEmail()))
                .andExpect(jsonPath("$.nickname").value(MEMBER.getNickname()))
                .andExpect(jsonPath("$.address").value(MEMBER.getAddress()))
                .andExpect(jsonPath("$.phone").value(MEMBER.getPhone()))
                .andExpect(jsonPath("$.memberStatus").value(MEMBER.getMemberStatus().name()))
                .andDo(document("members/img",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        REQUEST_PARTS_IMG,
                        MEMBER_RESPONSE_FIELDS
                ));
    }
}