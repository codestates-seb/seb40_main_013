package gohome.dailydaily.global.common.security.controller;

import com.google.gson.Gson;
import gohome.dailydaily.global.common.security.dto.PasswordDto;
import gohome.dailydaily.global.common.security.service.AuthService;
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
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AuthController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityTestConfig.class)
@AutoConfigureRestDocs
@WithMockCustomUser
class AuthControllerTest implements Reflection {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private AuthService authService;

    @Test
    public void refresh() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                post("/refresh")
                        .header("Refresh", "Refresh JWT Token")
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions.andExpect(status().isOk())
                .andDo(document("auth/refresh",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_REFRESH,
                        AUTH_RESPONSE_FIELDS
                ));
    }

    @Test
    public void verifyPassword() throws Exception {
        // given
        PasswordDto passwordDto = newInstance(PasswordDto.class);
        setField(passwordDto, "password", "password");

        String request = gson.toJson(passwordDto);

        // when
        ResultActions actions = mockMvc.perform(
                post("/password")
                        .header("Authorization", "JWT")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request)
        );

        // then
        actions.andExpect(status().isOk())
                .andDo(document("auth/password",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        requestFields(
                                FWP_PASSWORD
                        ),
                        AUTH_RESPONSE_FIELDS
                ));
    }

}