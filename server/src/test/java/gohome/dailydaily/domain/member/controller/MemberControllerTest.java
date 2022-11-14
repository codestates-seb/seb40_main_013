package gohome.dailydaily.domain.member.controller;

import com.google.gson.Gson;
import gohome.dailydaily.domain.member.dto.MemberDto;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.mapper.MemberMapper;
import gohome.dailydaily.domain.member.mapper.SellerMapper;
import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.util.Reflection;
import gohome.dailydaily.util.security.SecurityTestConfig;
import gohome.dailydaily.util.security.WithMockCustomUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static gohome.dailydaily.util.TestConstant.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = {MemberController.class, MemberMapper.class, SellerMapper.class})
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

    @Test
    public void signup() throws Exception {
        // given
        MemberDto.UserSignup signup = newInstance(MemberDto.UserSignup.class);
        setField(signup, "nickname", "닉네임");
        setField(signup, "email", "test@test.com");
        setField(signup, "password", "test1password!");

        String request = gson.toJson(signup);

        given(memberService.createMember(any(Member.class)))
                .willReturn(MEMBER);

        // when
        ResultActions actions = mockMvc.perform(
                post("/signup")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request)
        );

        // then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.memberId").value(MEMBER.getId()))
                .andExpect(jsonPath("$.email").value(MEMBER.getEmail()))
                .andExpect(jsonPath("$.nickname").value(MEMBER.getNickname()))
                .andExpect(jsonPath("$.address").value(MEMBER.getAddress()))
                .andExpect(jsonPath("$.phone").value(MEMBER.getPhone()))
                .andExpect(jsonPath("$.memberStatus").value(MEMBER.getMemberStatus().name()))
                .andDo(document("members/signup",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        requestFields(
                                FWP_NICKNAME, FWP_EMAIL, FWP_PASSWORD
                        ),
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
}