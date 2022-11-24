package gohome.dailydaily.global.common.security.controller;


import com.google.gson.Gson;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.repository.MemberRepository;
import gohome.dailydaily.global.common.security.dto.LoginDto;
import gohome.dailydaily.global.common.security.util.JwtTokenizer;
import gohome.dailydaily.util.Reflection;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Optional;

import static gohome.dailydaily.util.TestConstant.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
public class LoginControllerTest implements Reflection {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private MemberRepository memberRepository;
    @MockBean
    private PasswordEncoder passwordEncoder;
    @MockBean
    private JwtTokenizer jwtTokenizer;

    @Test
    public void login() throws Exception {
        // given
        LoginDto loginDto = newInstance(LoginDto.class);
        setField(loginDto, "email", "test@test.com");
        setField(loginDto, "password", "testPW123!@#");
        setField(loginDto, "keepState", true);

        String request = gson.toJson(loginDto);

        given(memberRepository.findByEmail(anyString()))
                .willReturn(Optional.of(MEMBER));
        given(passwordEncoder.matches(any(), any()))
                .willReturn(true);
        given(jwtTokenizer.getAccessToken(any(Member.class)))
                .willReturn("AccessToken");
        given(jwtTokenizer.getKeepStateRefreshToken(anyLong()))
                .willReturn("RefreshToken");

        // when
        ResultActions actions = mockMvc.perform(
                post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request)
        );

        // then
        actions.andExpect(status().isOk())
                .andDo(document("auth/login",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        requestFields(
                                FWP_EMAIL, FWP_PASSWORD, FWP_KEEP_STATE
                        ),
                        RESPONSE_HEADER_ACCESS_AND_REFRESH_TOKEN,
                        AUTH_RESPONSE_FIELDS
                ));
    }

}
