package gohome.dailydaily.domain.search.controller;

import gohome.dailydaily.domain.search.mapper.SearchMapper;
import gohome.dailydaily.domain.search.repository.SearchRedisRepository;
import gohome.dailydaily.util.security.SecurityTestConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.data.redis.core.DefaultTypedTuple;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.LinkedHashSet;
import java.util.List;

import static gohome.dailydaily.util.TestConstant.REQUEST_PREPROCESSOR;
import static gohome.dailydaily.util.TestConstant.RESPONSE_PREPROCESSOR;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.JsonFieldType.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {SearchController.class, SearchMapper.class})
@MockBean(JpaMetamodelMappingContext.class)
@Import({SecurityTestConfig.class})
@AutoConfigureRestDocs
class SearchControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SearchRedisRepository searchRedisRepository;

    @Test
    void getRank() throws Exception {
        // given
        DefaultTypedTuple<String> typedTuple1 = new DefaultTypedTuple<>("검색어1", 5D);
        DefaultTypedTuple<String> typedTuple2 = new DefaultTypedTuple<>("검색어2", 3D);
        DefaultTypedTuple<String> typedTuple3 = new DefaultTypedTuple<>("검색어3", 2D);
        DefaultTypedTuple<String> typedTuple4 = new DefaultTypedTuple<>("검색어4", 1D);

        given(searchRedisRepository.getRankTop5())
                .willReturn(new LinkedHashSet<>(List.of(typedTuple1, typedTuple2, typedTuple3, typedTuple4)));

        // when
        ResultActions perform = mockMvc.perform(
                get("/search/rank")
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        perform.andExpect(status().isOk())
                .andDo(document("search/rank",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        responseFields(
                                fieldWithPath("[]").type(ARRAY).description("데이터 (최대 5개)"),
                                fieldWithPath("[].keyword").type(STRING).description("검색어"),
                                fieldWithPath("[].count").type(NUMBER).description("검색 횟수")
                        )
                ));

    }
}