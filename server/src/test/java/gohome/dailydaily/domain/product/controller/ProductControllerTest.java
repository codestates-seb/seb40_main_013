package gohome.dailydaily.domain.product.controller;

import gohome.dailydaily.domain.member.mapper.SellerMapper;
import gohome.dailydaily.domain.product.controller.dto.GetProductListByCategoryDTO;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.OptionDto;
import gohome.dailydaily.domain.product.mapper.OptionMapper;
import gohome.dailydaily.domain.product.mapper.ProductMapper;
import gohome.dailydaily.domain.product.service.ProductService;
import gohome.dailydaily.domain.review.mapper.ReviewMapper;
import gohome.dailydaily.global.common.dto.SliceResponseDto;
import gohome.dailydaily.util.security.SecurityTestConfig;
import gohome.dailydaily.util.security.WithMockCustomUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static gohome.dailydaily.util.TestConstant.*;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = {ProductController.class, ProductMapper.class, OptionMapper.class, SellerMapper.class, ReviewMapper.class})
@MockBean(JpaMetamodelMappingContext.class)
@Import({SecurityTestConfig.class})
@AutoConfigureRestDocs
@WithMockCustomUser
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Test
    public void getProduct() throws Exception {

        given(productService.getProduct(PRODUCT.getId()))
                .willReturn(PRODUCT);

        //when
        ResultActions actions = mockMvc.perform(get("/products/details/{product-id}", PRODUCT.getId())
                .accept(MediaType.APPLICATION_JSON));

        MvcResult result = actions.andExpect(status().isOk())
                .andDo(document("products/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        PRODUCT_RESPONSE_FIELDS,
                        PATH_PARAM_PRODUCT_ID
                ))
                .andExpect(jsonPath("$.productId").value(PRODUCT.getId()))
                .andExpect(jsonPath("$.title").value(PRODUCT.getTitle()))
                .andExpect(jsonPath("$.content").value(PRODUCT.getContent()))
                .andExpect(jsonPath("$.price").value(PRODUCT.getPrice()))
                .andExpect(jsonPath("$.img.fileName").value(PRODUCT.getImg().getFileName()))
                .andExpect(jsonPath("$.img.fullPath").value(PRODUCT.getImg().getFullPath()))
                .andExpect(jsonPath("$.score").value(PRODUCT.getScore() / 10F))
                .andExpect(jsonPath("$.seller.sellerId").value(PRODUCT.getSeller().getId()))
                .andExpect(jsonPath("$.seller.memberId").value(PRODUCT.getSeller().getMember().getId()))
                .andReturn();
    }

    @Test
    public void getProductListByCategory() throws Exception {
        SliceResponseDto<CategoryGetDto> products = new SliceResponseDto<>(new SliceImpl<>(
                List.of(new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                                PRODUCT.getPrice(), PRODUCT.getScore(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain()),
                        new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                                PRODUCT2.getPrice(), PRODUCT2.getScore(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain())), PAGEABLE, true));

        given(productService.getProductListByCategory(any(GetProductListByCategoryDTO.class)))
                .willReturn(products);

        ResultActions actions = mockMvc.perform(
                get("/products")
                        .accept(MediaType.APPLICATION_JSON)
                        .param("main", GET_PRODUCT_LIST_BY_CATEGORY_DTO.getMain())
                        .param("sub", GET_PRODUCT_LIST_BY_CATEGORY_DTO.getSub())
                        .param("page", String.valueOf(PAGEABLE.getPageNumber()))
                        .param("size", String.valueOf(PAGEABLE.getPageSize()))
                        .param("sort", String.valueOf(PAGEABLE.getSort()).replace(": ", ","))
        );

        actions.andExpect(status().isOk())
                .andDo(document("products/category/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_PARAM_CATEGORY,
                        responseFields(
                                FWP_CATEGORY_CONTENT_PRODUCT_ID, FWP_CONTENT_PRODUCT_IMG_NAME, FWP_CONTENT_PRODUCT_IMG_PATH,
                                FWP_CATEGORY_CONTENT_PRODUCT_TITLE, FWP_CONTENT_PRODUCT_PRICE, FWP_CONTENT_PRODUCT_SCORE,
                                FWP_CONTENT_PRODUCT_CATEGORY_MAIN, FWP_CONTENT_PRODUCT_SELLER_NICKNAME,
                                FWP_SLICE_INFO, FWP_SLICE_INFO_PAGE, FWP_SLICE_INFO_SIZE, FWP_SLICE_INFO_HAS_NEXT
                        )));
    }

    @Test
    public void getScoreTop5() throws Exception {
        List<CategoryGetDto> products = new ArrayList<>(List.of(new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                        PRODUCT.getPrice(), PRODUCT.getScore(), PRODUCT.getSeller().getMember().getNickname(),
                        PRODUCT.getCategory().getMain()),
                new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                        PRODUCT2.getPrice(), PRODUCT2.getScore(), PRODUCT.getSeller().getMember().getNickname(),
                        PRODUCT.getCategory().getMain())));

        given(productService.getScoreTop5()).willReturn(products);

        ResultActions actions = mockMvc.perform(
                get("/products/score")
                        .accept(MediaType.APPLICATION_JSON));

        actions.andExpect(status().isOk())
                .andDo(document("products/score/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        responseFields(
                                FWP_SCORE_PRODUCT_ID, FWP_SCORE_PRODUCT_IMG_PATH, FWP_SCORE_PRODUCT_IMG_NAME,
                                FWP_PRODUCTS_SELLER_NICKNAME, FWP_PRODUCTS_CATEGORY_MAIN,
                                FWP_SCORE_PRODUCT_TITLE, FWP_SCORE_PRODUCT_PRICE, FWP_SCORE_PRODUCT_SCORE
                        )));
    }

    @Test
    public void getBrandListLikeTop5() throws Exception {
        List<CategoryGetDto> brand1 = new ArrayList<>(List.of(new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                        PRODUCT.getPrice(), PRODUCT.getScore(), PRODUCT.getSeller().getMember().getNickname(),
                        PRODUCT.getCategory().getMain()),
                new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                        PRODUCT2.getPrice(), PRODUCT2.getScore(), PRODUCT.getSeller().getMember().getNickname(),
                        PRODUCT.getCategory().getMain())));

        List<CategoryGetDto> brand2 = new ArrayList<>(List.of(new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                        PRODUCT.getPrice(), PRODUCT.getScore(), PRODUCT.getSeller().getMember().getNickname(),
                        PRODUCT.getCategory().getMain()),
                new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                        PRODUCT2.getPrice(), PRODUCT2.getScore(), PRODUCT.getSeller().getMember().getNickname(),
                        PRODUCT.getCategory().getMain())));

        List<List<CategoryGetDto>> products = new ArrayList<>();
        products.add(brand1);
        products.add(brand2);
        given(productService.getBrandListLikeTop5()).willReturn(products);

        ResultActions actions = mockMvc.perform(
                get("/products/brandListLike")
                        .accept(MediaType.APPLICATION_JSON));

        actions.andExpect(status().isOk())
                .andDo(document("products/brandList/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        responseFields(
                                FWP_BRAND_PRODUCT_ID, FWP_BRAND_PRODUCT_IMG_PATH, FWP_BRAND_PRODUCT_IMG_NAME,
                                FWP_BRAND_PRODUCT_TITLE, FWP_BRAND_PRODUCT_PRICE, FWP_BRAND_PRODUCT_SCORE,
                                FWP_BRAND_PRODUCTS_SELLER_NICKNAME, FWP_BRAND_PRODUCTS_CATEGORY_MAIN
                        )));
    }

    @Test
    public void getCategoryCreatedTop15() throws Exception {
        List<CategoryGetDto> category1 = new ArrayList<>(
                List.of(new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                                PRODUCT.getPrice(), PRODUCT.getScore(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain()),
                        new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                                PRODUCT.getPrice(), PRODUCT.getScore(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain())));

        List<CategoryGetDto> category2 = new ArrayList<>(
                List.of(new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                                PRODUCT2.getPrice(), PRODUCT2.getScore(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain()),
                        new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                                PRODUCT2.getPrice(), PRODUCT2.getScore(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain())));

        List<List<CategoryGetDto>> products = new ArrayList<>();
        products.add(category1);
        products.add(category2);
        given(productService.getCategoryCreatedTop15()).willReturn(products);

        ResultActions actions = mockMvc.perform(
                get("/products/categoryCreated")
                        .accept(MediaType.APPLICATION_JSON));

        actions.andExpect(status().isOk())
                .andDo(document("products/categoryCreated/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        responseFields(
                                FWP_BRAND_PRODUCT_ID, FWP_BRAND_PRODUCT_IMG_PATH, FWP_BRAND_PRODUCT_IMG_NAME,
                                FWP_BRAND_PRODUCT_TITLE, FWP_BRAND_PRODUCT_PRICE, FWP_BRAND_PRODUCT_SCORE,
                                FWP_BRAND_PRODUCTS_SELLER_NICKNAME, FWP_BRAND_PRODUCTS_CATEGORY_MAIN
                        )));
    }
//    @Test
//    public void getCategoryMain() throws Exception {
//        Slice<CategoryGetDto> products = new SliceImpl<>(
//                List.of(new CategoryGetDto(PRODUCT1.getId(), PRODUCT1.getImg(), PRODUCT1.getTitle(),
//                                PRODUCT1.getPrice(), PRODUCT1.getScore()),
//                        new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
//                                PRODUCT2.getPrice(), PRODUCT2.getScore())), PAGEABLE, true);
//
//        given(productService.getCategoryList(PAGEABLE, CATEGORY.getMain()))
//                .willReturn(products);
//
//        ResultActions actions = mockMvc.perform(
//                get("/products/{main}", CATEGORY.getMain())
//                        .accept(MediaType.APPLICATION_JSON)
//                        .param("page", String.valueOf(PAGEABLE.getPageNumber()))
//                        .param("size", String.valueOf(PAGEABLE.getPageSize()))
//                        .param("sort", String.valueOf(PAGEABLE.getSort()).replace(": ", ","))
//        );
//
//        actions.andExpect(status().isOk())
//                .andDo(document("products/main/get",
//                        REQUEST_PREPROCESSOR,
//                        RESPONSE_PREPROCESSOR,
//                        REQUEST_PARAM_PAGE,
//                        PATH_PARAM_CATEGORY_MAIN,
//                        responseFields(
//                                FWP_CATEGORY_CONTENT_PRODUCT_ID, FWP_CONTENT_PRODUCT_IMG_NAME, FWP_CONTENT_PRODUCT_IMG_PATH, FWP_CATEGORY_CONTENT_PRODUCT_TITLE, FWP_CONTENT_PRODUCT_PRICE, FWP_CONTENT_PRODUCT_SCORE
//                                , FWP_SLICE_INFO, FWP_SLICE_INFO_PAGE, FWP_SLICE_INFO_SIZE, FWP_SLICE_INFO_HAS_NEXT
//                        )));
//    }
//
//    @Test
//    public void getCategoryMainSub() throws Exception {
//        Slice<CategoryGetDto> products = new SliceImpl<>(
//                List.of(new CategoryGetDto(PRODUCT1.getId(), PRODUCT1.getImg(), PRODUCT1.getTitle(),
//                                PRODUCT1.getPrice(), PRODUCT1.getScore()),
//                        new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
//                                PRODUCT2.getPrice(), PRODUCT2.getScore())), PAGEABLE, true);
//
//        given(productService.getCategoryList(PAGEABLE, CATEGORY.getMain(), CATEGORY.getSub()))
//                .willReturn(products);
//
//        ResultActions actions = mockMvc.perform(
//                get("/products/{main}/{sub}", CATEGORY.getMain(), CATEGORY.getSub())
//                        .accept(MediaType.APPLICATION_JSON)
//                        .param("page", String.valueOf(PAGEABLE.getPageNumber()))
//                        .param("size", String.valueOf(PAGEABLE.getPageSize()))
//                        .param("sort", String.valueOf(PAGEABLE.getSort()).replace(": ", ","))
//        );
//
//        actions.andExpect(status().isOk())
//                .andDo(document("products/main/sub/get",
//                        REQUEST_PREPROCESSOR,
//                        RESPONSE_PREPROCESSOR,
//                        REQUEST_PARAM_PAGE,
//                        PATH_PARAM_CATEGORY_MAIN_SUB,
//                        responseFields(
//                                FWP_CATEGORY_CONTENT_PRODUCT_ID, FWP_CONTENT_PRODUCT_IMG_NAME, FWP_CONTENT_PRODUCT_IMG_PATH, FWP_CATEGORY_CONTENT_PRODUCT_TITLE, FWP_CONTENT_PRODUCT_PRICE, FWP_CONTENT_PRODUCT_SCORE
//                                , FWP_SLICE_INFO, FWP_SLICE_INFO_PAGE, FWP_SLICE_INFO_SIZE, FWP_SLICE_INFO_HAS_NEXT
//
//                        )));
//    }
}
