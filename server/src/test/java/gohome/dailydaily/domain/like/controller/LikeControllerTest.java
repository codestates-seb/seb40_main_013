package gohome.dailydaily.domain.like.controller;

import com.google.gson.Gson;
import gohome.dailydaily.domain.like.service.LikeService;
import gohome.dailydaily.global.common.security.resolver.MemberId;
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
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = LikeController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityTestConfig.class)
@AutoConfigureRestDocs
@WithMockCustomUser
class LikeControllerTest implements Reflection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private LikeService likeService;

    @Test
    void postLike() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                post("/products/{product-id}/likes", PRODUCT.getId())
                        .header("Authorization", "JWT")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isCreated())
                .andDo(document("likes/post",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        PATH_PARAM_PRODUCT_ID
                ));
    }

    @Test
    void deleteLike() throws Exception {
        // when
        ResultActions actions = mockMvc.perform(
                delete("/products/{product-id}/likes", PRODUCT.getId())
                        .header("Authorization", "JWT")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isNoContent())
                .andDo(document("likes/delete",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        PATH_PARAM_PRODUCT_ID
                ));
    }
    @Test
    void getLike() throws Exception{

        given(likeService.getProductLike(MEMBER.getId(), PRODUCT.getId()))
                .willReturn(false);
        ResultActions actions = mockMvc.perform(
                get("/products/{product-id}/likes", PRODUCT.getId())
                        .header("Authorization", "JWT")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isOk())
                .andDo(document("likes/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        PATH_PARAM_PRODUCT_ID
                ));
    }
}