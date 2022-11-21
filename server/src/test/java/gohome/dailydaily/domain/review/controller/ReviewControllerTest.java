package gohome.dailydaily.domain.review.controller;

import com.google.gson.Gson;
import gohome.dailydaily.domain.review.dto.ReviewDto;
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
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static gohome.dailydaily.util.TestConstant.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {ReviewController.class, ReviewMapper.class})
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityTestConfig.class)
@AutoConfigureRestDocs
@WithMockCustomUser
class ReviewControllerTest implements Reflection {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private ReviewService reviewService;

    @Test
    void postReview() throws Exception {
        // given
        ReviewDto.Post post = newInstance(ReviewDto.Post.class);
        setField(post, "content", REVIEW1.getContent());
        setField(post, "score", REVIEW1.getScore() / 10F);

        String request = gson.toJson(post);

        given(reviewService.createReview(eq(MEMBER.getId()), eq(REVIEW1.getProduct().getId()), any(Review.class)))
                .willReturn(REVIEW1);

        // when
        ResultActions actions = mockMvc.perform(
                post("/products/{product-id}/reviews", REVIEW1.getProduct().getId())
                        .header("Authorization", "JWT")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request)
        );
        // then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.reviewId").value(REVIEW1.getId()))
                .andExpect(jsonPath("$.productId").value(REVIEW1.getProduct().getId()))
                .andExpect(jsonPath("$.productTitle").value(REVIEW1.getProduct().getTitle()))
                .andExpect(jsonPath("$.content").value(REVIEW1.getContent()))
                .andExpect(jsonPath("$.score").value(REVIEW1.getScore() / 10F))
                .andDo(document("reviews/post",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        PATH_PARAM_PRODUCT_ID,
                        requestFields(
                                FWP_REVIEW_CONTENT, FWP_REVIEW_SCORE
                        ),
                        REVIEW_RESPONSE_FIELDS
                ));
    }

    @Test
    void patchReview() throws Exception {
        // given
        ReviewDto.Patch patch = newInstance(ReviewDto.Patch.class);
        setField(patch, "reviewId", REVIEW1.getId());
        setField(patch, "content", REVIEW1.getContent());
        setField(patch, "score", REVIEW1.getScore() / 10F);

        String request = gson.toJson(patch);

        given(reviewService.updateReview(eq(MEMBER.getId()), eq(REVIEW1.getProduct().getId()), any(Review.class)))
                .willReturn(REVIEW1);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/products/{product-id}/reviews/{review-id}",
                        REVIEW1.getProduct().getId(), REVIEW1.getId())
                        .header("Authorization", "JWT")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request)
        );
        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.reviewId").value(REVIEW1.getId()))
                .andExpect(jsonPath("$.productId").value(REVIEW1.getProduct().getId()))
                .andExpect(jsonPath("$.productTitle").value(REVIEW1.getProduct().getTitle()))
                .andExpect(jsonPath("$.content").value(REVIEW1.getContent()))
                .andExpect(jsonPath("$.score").value(REVIEW1.getScore() / 10F))
                .andDo(document("reviews/patch",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        PATH_PARAM_PRODUCT_ID_AND_REVIEW_ID,
                        requestFields(
                                FWP_REVIEW_ID, FWP_REVIEW_CONTENT, FWP_REVIEW_SCORE
                        ),
                        REVIEW_RESPONSE_FIELDS
                ));
    }

    @Test
    void deleteReview() throws Exception {
        // given
        doNothing().when(reviewService).deleteReview(MEMBER.getId(), REVIEW1.getProduct().getId(), REVIEW1.getId());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/products/{product-id}/reviews/{review-id}",
                        REVIEW1.getProduct().getId(), REVIEW1.getId())
                        .header("Authorization", "JWT")
        );

        // then
        actions.andExpect(status().isNoContent())
                .andDo(document("reviews/delete",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        PATH_PARAM_PRODUCT_ID_AND_REVIEW_ID
                ));
    }
}