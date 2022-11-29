package gohome.dailydaily.domain.product.controller;

import com.google.gson.Gson;
import gohome.dailydaily.domain.member.mapper.SellerMapper;
import gohome.dailydaily.domain.product.controller.dto.GetProductListByDto;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.ProductDto;
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
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import static gohome.dailydaily.util.TestConstant.*;
import static java.util.List.of;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
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

        given(productService.findProduct(PRODUCT.getId(), MEMBER.getId()))
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
                .andExpect(jsonPath("$.content").value(new Gson().fromJson(PRODUCT.getContent(), List.class)))
                .andExpect(jsonPath("$.price").value(PRODUCT.getPrice()))
                .andExpect(jsonPath("$.existsLike").value(false))
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
                of(new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                                PRODUCT.getPrice(), PRODUCT.getScore().floatValue(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain(), PRODUCT.getReviews().size()),
                        new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                                PRODUCT2.getPrice(), PRODUCT2.getScore().floatValue(), PRODUCT2.getSeller().getMember().getNickname(),
                                PRODUCT2.getCategory().getMain(), PRODUCT2.getReviews().size())), PAGEABLE, true));
        given(productService.getProductListByCategory(any(GetProductListByDto.class)))
                .willReturn(products);

        ResultActions actions = mockMvc.perform(
                get("/products")
                        .accept(MediaType.APPLICATION_JSON)
                        .param("main", GET_PRODUCT_LIST_BY_CATEGORY_DTO.getMain())
                        .param("sub", GET_PRODUCT_LIST_BY_CATEGORY_DTO.getSub())
                        .param("page", String.valueOf(PAGEABLE.getPageNumber()))
                        .param("size", String.valueOf(PAGEABLE.getPageSize()))
                        .param("sortType", String.valueOf(PAGEABLE.getSort()).replaceAll(":[^0-9]*", ""))
                        .param("order", String.valueOf(PAGEABLE.getSort()).replaceAll("[^0-9]*: ", ""))

        );

        actions.andExpect(status().isOk())
                .andDo(document("products/category/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_PARAM_CATEGORY,
                        responseFields(
                                FWP_CATEGORY_CONTENT_PRODUCT_ID, FWP_CONTENT_PRODUCT_IMG_NAME, FWP_CONTENT_PRODUCT_IMG_PATH,
                                FWP_CATEGORY_CONTENT_PRODUCT_TITLE, FWP_CONTENT_PRODUCT_PRICE, FWP_CONTENT_PRODUCT_SCORE,
                                FWP_CONTENT_PRODUCT_CATEGORY_MAIN, FWP_CONTENT_PRODUCT_SELLER_NICKNAME, FWP_CONTENT_REVIEWS,
                                FWP_SLICE_INFO, FWP_SLICE_INFO_PAGE, FWP_SLICE_INFO_SIZE, FWP_SLICE_INFO_HAS_NEXT
                        )));
    }

    @Test
    public void getScoreTop5() throws Exception {
        List<CategoryGetDto> products = new ArrayList<>(
                of(
                        new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                                PRODUCT.getPrice(), PRODUCT.getScore().floatValue(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain(), PRODUCT.getReviews().size()),
                        new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                                PRODUCT2.getPrice(), PRODUCT2.getScore().floatValue(), PRODUCT2.getSeller().getMember().getNickname(),
                                PRODUCT2.getCategory().getMain(), PRODUCT2.getReviews().size())));

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
                                FWP_PRODUCTS_SELLER_NICKNAME, FWP_PRODUCTS_CATEGORY_MAIN, FWP_PRODUCTS_REVIEWS,
                                FWP_SCORE_PRODUCT_TITLE, FWP_SCORE_PRODUCT_PRICE, FWP_SCORE_PRODUCT_SCORE
                        )));
    }

    @Test
    public void getBrandListLikeTop15() throws Exception {
        List<CategoryGetDto> brand1 = new ArrayList<>(
                of(
                        new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                                PRODUCT.getPrice(), PRODUCT.getScore().floatValue(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain(), PRODUCT.getReviews().size()),
                        new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                                PRODUCT2.getPrice(), PRODUCT2.getScore().floatValue(), PRODUCT2.getSeller().getMember().getNickname(),
                                PRODUCT2.getCategory().getMain(), PRODUCT2.getReviews().size())));

        List<CategoryGetDto> brand2 = new ArrayList<>(
                of(
                        new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                                PRODUCT.getPrice(), PRODUCT.getScore().floatValue(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain(), PRODUCT.getReviews().size()),
                        new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                                PRODUCT2.getPrice(), Float.valueOf(PRODUCT2.getScore()), PRODUCT2.getSeller().getMember().getNickname(),
                                PRODUCT2.getCategory().getMain(), PRODUCT2.getReviews().size())));

        HashMap<String, List<CategoryGetDto>> products = new HashMap<>();
        products.put("nickname", brand1);
        products.put("nickname", brand2);
        given(productService.getBrandListLikeTop15()).willReturn(products);

        ResultActions actions = mockMvc.perform(
                get("/products/brandListLike")
                        .accept(MediaType.APPLICATION_JSON));

        actions.andExpect(status().isOk())
                .andDo(document("products/brandList/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        responseFields(
                                FWP_BRAND_PRODUCT_ID, FWP_BRAND_PRODUCT_IMG_PATH, FWP_BRAND_PRODUCT_IMG_NAME,
                                FWP_BRAND_PRODUCT_TITLE, FWP_BRAND_PRODUCT_PRICE, FWP_BRAND_PRODUCT_SCORE, FWP_NICKNAME_PRODUCT_REVIEWS,
                                FWP_BRAND_PRODUCTS_SELLER_NICKNAME, FWP_BRAND_PRODUCTS_CATEGORY_MAIN
                        )));
    }

    @Test
    public void getCategoryCreatedTop5() throws Exception {
        List<CategoryGetDto> category1 = new ArrayList<>(
                of(new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                                PRODUCT.getPrice(), PRODUCT.getScore().floatValue(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain(), PRODUCT.getReviews().size()),
                        new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                                PRODUCT.getPrice(), PRODUCT.getScore().floatValue(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain(), PRODUCT.getReviews().size())));

        List<CategoryGetDto> category2 = new ArrayList<>(
                of(new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                                PRODUCT2.getPrice(), PRODUCT2.getScore().floatValue(), PRODUCT2.getSeller().getMember().getNickname(),
                                PRODUCT2.getCategory().getMain(), PRODUCT2.getReviews().size()),
                        new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                                PRODUCT2.getPrice(), PRODUCT2.getScore().floatValue(), PRODUCT2.getSeller().getMember().getNickname(),
                                PRODUCT2.getCategory().getMain(), PRODUCT2.getReviews().size())));

        HashMap<String, List<CategoryGetDto>> products = new HashMap<>();
        products.put("categoryMain", category1);
        products.put("categoryMain", category2);
        given(productService.getCategoryCreatedTop5()).willReturn(products);

        ResultActions actions = mockMvc.perform(
                get("/products/categoryCreated")
                        .accept(MediaType.APPLICATION_JSON));

        actions.andExpect(status().isOk())
                .andDo(document("products/categoryCreated/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        responseFields(
                                FWP_CATEGORY_PRODUCT_ID, FWP_CATEGORY_PRODUCT_IMG_PATH, FWP_CATEGORY_PRODUCT_IMG_NAME,
                                FWP_CATEGORY_PRODUCT_TITLE, FWP_CATEGORY_PRODUCT_PRICE, FWP_CATEGORY_PRODUCT_SCORE,
                                FWP_CATEGORY_PRODUCT_REVIEWS, FWP_CATEGORY_PRODUCTS_SELLER_NICKNAME,
                                FWP_CATEGORY_PRODUCTS_CATEGORY_MAIN
                        )));
    }

    @Test
    public void getProductListByTitle() throws Exception {
        SliceResponseDto<CategoryGetDto> products = new SliceResponseDto<>(new SliceImpl<>(
                of(new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                                PRODUCT.getPrice(), PRODUCT.getScore().floatValue(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain(), PRODUCT.getReviews().size()),
                        new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                                PRODUCT.getPrice(), PRODUCT.getScore().floatValue(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain(), PRODUCT.getReviews().size())), PAGEABLE, true));
        given(productService.getProductListByTitle(any(GetProductListByDto.class)))
                .willReturn(products);

        ResultActions actions = mockMvc.perform(
                get("/products/search")
                        .accept(MediaType.APPLICATION_JSON)
                        .param("title", GET_PRODUCT_LIST_BY_CATEGORY_DTO.getTitle())
                        .param("page", String.valueOf(PAGEABLE.getPageNumber()))
                        .param("size", String.valueOf(PAGEABLE.getPageSize()))
                        .param("sortType", String.valueOf(PAGEABLE.getSort()).replaceAll(":[^0-9]*", ""))
                        .param("order", String.valueOf(PAGEABLE.getSort()).replaceAll("[^0-9]*: ", ""))

        );

        actions.andExpect(status().isOk())
                .andDo(document("products/title/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_PARAM_TITLE,
                        responseFields(
                                FWP_CATEGORY_CONTENT_PRODUCT_ID, FWP_CONTENT_PRODUCT_IMG_NAME, FWP_CONTENT_PRODUCT_IMG_PATH,
                                FWP_CATEGORY_CONTENT_PRODUCT_TITLE, FWP_CONTENT_PRODUCT_PRICE, FWP_CONTENT_PRODUCT_SCORE,
                                FWP_CONTENT_PRODUCT_CATEGORY_MAIN, FWP_CONTENT_PRODUCT_SELLER_NICKNAME, FWP_CONTENT_REVIEWS,
                                FWP_SLICE_INFO, FWP_SLICE_INFO_PAGE, FWP_SLICE_INFO_SIZE, FWP_SLICE_INFO_HAS_NEXT
                        )));
    }

    @Test
    public void getProductListByBrand() throws Exception {
        SliceResponseDto<CategoryGetDto> products = new SliceResponseDto<>(new SliceImpl<>(
                of(new CategoryGetDto(PRODUCT.getId(), PRODUCT.getImg(), PRODUCT.getTitle(),
                                PRODUCT.getPrice(), PRODUCT.getScore().floatValue(), PRODUCT.getSeller().getMember().getNickname(),
                                PRODUCT.getCategory().getMain(), PRODUCT.getReviews().size()),
                        new CategoryGetDto(PRODUCT2.getId(), PRODUCT2.getImg(), PRODUCT2.getTitle(),
                                PRODUCT2.getPrice(), PRODUCT2.getScore().floatValue(), PRODUCT2.getSeller().getMember().getNickname(),
                                PRODUCT2.getCategory().getMain(), PRODUCT2.getReviews().size())), PAGEABLE, true));
        given(productService.getProductListByBrand(any(GetProductListByDto.class)))
                .willReturn(products);

        ResultActions actions = mockMvc.perform(
                get("/products/brand/{sellerId}", PRODUCT.getSeller().getId())
                        .accept(MediaType.APPLICATION_JSON)
                        .param("main", GET_PRODUCT_LIST_BY_CATEGORY_DTO.getMain())
                        .param("sub", GET_PRODUCT_LIST_BY_CATEGORY_DTO.getSub())
                        .param("page", String.valueOf(PAGEABLE.getPageNumber()))
                        .param("size", String.valueOf(PAGEABLE.getPageSize()))
                        .param("sortType", String.valueOf(PAGEABLE.getSort()).replaceAll(":[^0-9]*", ""))
                        .param("order", String.valueOf(PAGEABLE.getSort()).replaceAll("[^0-9]*: ", ""))

        );

        actions.andExpect(status().isOk())
                .andDo(document("products/brand/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_PARAM_CATEGORY,
                        responseFields(
                                FWP_CATEGORY_CONTENT_PRODUCT_ID, FWP_CONTENT_PRODUCT_IMG_NAME, FWP_CONTENT_PRODUCT_IMG_PATH,
                                FWP_CATEGORY_CONTENT_PRODUCT_TITLE, FWP_CONTENT_PRODUCT_PRICE, FWP_CONTENT_PRODUCT_SCORE,
                                FWP_CONTENT_PRODUCT_CATEGORY_MAIN, FWP_CONTENT_PRODUCT_SELLER_NICKNAME, FWP_CONTENT_REVIEWS,
                                FWP_SLICE_INFO, FWP_SLICE_INFO_PAGE, FWP_SLICE_INFO_SIZE, FWP_SLICE_INFO_HAS_NEXT
                        )));
    }

    @Test
    public void getProductCategoryCount() throws Exception {
        HashMap<String, Long> count = new HashMap<>();
        count.put("count", 10l);
        given(productService.getProductCategoryCount(any(GetProductListByDto.class)))
                .willReturn(count);

        ResultActions actions = mockMvc.perform(
                get("/products/count")
                        .accept(MediaType.APPLICATION_JSON)
                        .param("main", GET_PRODUCT_LIST_BY_CATEGORY_DTO.getMain())
                        .param("sub", GET_PRODUCT_LIST_BY_CATEGORY_DTO.getSub())
        );

        actions.andExpect(status().isOk())
                .andDo(document("products/count",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_PARAM_COUNT,
                        responseFields(CATEGORY_COUNT)));
    }

    @Test
    public void postProduct() throws Exception {
        // given
        given(productService.postProduct(any(ProductDto.PostProduct.class)))
                .willReturn(1L);

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/products")
                        .file(IMG)
                        .file(IMG_LIST.get(0))
                        .file(IMG_LIST.get(1))
                        .header("Authorization", "JWT")
                        .param("title", PRODUCT.getTitle())
                        .param("sellerId", String.valueOf(PRODUCT.getSeller().getId()))
                        .param("optionList[0].color", OPTION.getColor())
                        .param("optionList[0].stock", String.valueOf(OPTION.getStock()))
                        .param("optionList[1].color", OPTION.getColor())
                        .param("optionList[1].stock", String.valueOf(OPTION.getStock()))
                        .param("price", String.valueOf(PRODUCT.getPrice()))
                        .param("main",PRODUCT.getCategory().getMain())
                        .param("sub",PRODUCT.getCategory().getSub())
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isCreated())
                .andDo(document("products/post",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        REQUEST_PARAM_PRODUCT,
                        REQUEST_PARTS_IMG1
                ));
    }

}
