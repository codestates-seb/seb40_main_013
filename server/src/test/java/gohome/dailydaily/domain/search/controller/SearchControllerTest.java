package gohome.dailydaily.domain.search.controller;

import gohome.dailydaily.domain.search.dto.SearchDto;
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
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static gohome.dailydaily.util.TestConstant.REQUEST_PREPROCESSOR;
import static gohome.dailydaily.util.TestConstant.RESPONSE_PREPROCESSOR;
import static org.mockito.ArgumentMatchers.anySet;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.JsonFieldType.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {SearchController.class})
@MockBean(JpaMetamodelMappingContext.class)
@Import({SecurityTestConfig.class})
@AutoConfigureRestDocs
class SearchControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private SearchMapper searchMapper;
    @MockBean
    private SearchRedisRepository searchRedisRepository;

    @Test
    void getRank() throws Exception {
        // given
        SearchDto.RankResponse response1 = SearchDto.RankResponse.builder().count(5L).keyword("검색어1").build();
        SearchDto.RankResponse response2 = SearchDto.RankResponse.builder().count(3L).keyword("검색어2").build();
        SearchDto.RankResponse response3 = SearchDto.RankResponse.builder().count(2L).keyword("검색어3").build();
        SearchDto.RankResponse response4 = SearchDto.RankResponse.builder().count(1L).keyword("검색어4").build();

        given(searchMapper.toResponse(anySet()))
                .willReturn(List.of(response1, response2, response3, response4));

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
                                fieldWithPath("[]").type(ARRAY).description("데이터 (최대 20개)"),
                                fieldWithPath("[].keyword").type(STRING).description("검색어"),
                                fieldWithPath("[].count").type(NUMBER).description("검색 횟수")
                        )
                ));

    }
}