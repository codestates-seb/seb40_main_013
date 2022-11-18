package gohome.dailydaily.domain.cart.controller;

import com.google.gson.Gson;
import gohome.dailydaily.domain.cart.dto.ProductCartDto;
import gohome.dailydaily.domain.cart.mapper.CartMapper;
import gohome.dailydaily.domain.cart.mapper.ProductCartMapper;
import gohome.dailydaily.domain.cart.service.CartService;
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

import java.util.List;

import static gohome.dailydaily.util.TestConstant.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willReturn;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {CartController.class, CartMapper.class, ProductCartMapper.class})
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityTestConfig.class)
@AutoConfigureRestDocs
@WithMockCustomUser
class CartControllerTest implements Reflection {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private CartService cartService;

    @Test
    void postCart() throws Exception {
        // given
        ProductCartDto.Post post = newInstance(ProductCartDto.Post.class);
        setField(post, "count", PRODUCT_CART.getCount());
        setField(post, "optionId", PRODUCT_CART.getOption().getId());

        String request = gson.toJson(post);

        given(cartService.addCart(PRODUCT_CART, MEMBER.getId())).willReturn(CART);

        // when
        ResultActions actions = mockMvc.perform(
                post("/products/{productId}/cart", PRODUCT_CART.getProduct().getId())
                        .header("Authorization", "JWT")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request)
        );

        // then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.cartId").value(CART.getId()))
                .andExpect(jsonPath("$.memberId").value(MEMBER.getId()))
                .andExpect(jsonPath("$.productCarts").value(List.of(PRODUCT_CART)))
                .andDo(document("cart/post",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        PATH_PARAM_PRODUCT_ID,
                        requestFields(
                                FWP_PRODUCT_CART_COUNT,
                                FWP_OPTION_ID
                        ),
                        responseFields(
                                FWP_CART_ID,
                                FWP_MEMBER_ID,
                                FWP_PRODUCT_CART_ID,
                                FWP_PRODUCT_CART_IMG_NAME,
                                FWP_PRODUCT_CART_IMG_PATH,
                                FWP_PRODUCT_CART_TITLE,
                                FWP_PRODUCT_CART_COUNT,
                                FWP_PRODUCT_CART_PRICE
                        )
                ));

    }
}