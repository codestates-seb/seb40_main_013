package gohome.dailydaily.domain.cart.controller;

import com.google.gson.Gson;
import gohome.dailydaily.domain.cart.dto.ProductCartDto;
import gohome.dailydaily.domain.cart.entity.ProductCart;
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

import static gohome.dailydaily.util.TestConstant.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
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
    void postProductCart() throws Exception {
        // given
        ProductCartDto.Post post = newInstance(ProductCartDto.Post.class);
        setField(post, "count", PRODUCT_CART.getCount());
        setField(post, "productId", PRODUCT.getId());
        setField(post, "optionId", PRODUCT_CART.getOption().getId());

        String request = gson.toJson(post);


        given(cartService.addCart(any(ProductCart.class), eq(MEMBER.getId()))).willReturn(CART);

        // when
        ResultActions actions = mockMvc.perform(
                post("/carts")
                        .header("Authorization", "JWT")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request)
        );

        // then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.cartId").value(CART.getId()))
                .andExpect(jsonPath("$.productCarts[0].productCartId").value(PRODUCT_CART.getId()))
                .andDo(document("carts/post",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        requestFields(
                                FWP_PRODUCT_ID,
                                FWP_COUNT,
                                FWP_OPTION_ID
                        ),
                        CART_RESPONSE_FIELDS
                ));
    }

    @Test
    void deleteProductCart() throws Exception {
        // given
//        doNothing().when(cartService).cancelCart(PRODUCT_CART.getId(), MEMBER.getId());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/carts/{product-cart-id}",
                        PRODUCT_CART.getId())
                        .header("Authorization", "JWT")
        );

        // then
        actions.andExpect(status().isNoContent())
                .andDo(document("carts/delete",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        PATH_PARAM_PRODUCT_CART_ID
                ));
    }

    @Test
    void getCart() throws Exception{
        // given
        given(cartService.getCart(MEMBER.getId())).willReturn(CART);

        // when
        ResultActions actions = mockMvc.perform(
                get("/carts")
                        .header("Authorization", "JWT")
        );

        // then
        actions.andExpect(status().isOk())
                .andDo(document("carts/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        CART_RESPONSE_FIELDS
                ));
    }

    @Test
    void patchProductCart() throws Exception{
        // given
        ProductCartDto.Patch patch = newInstance(ProductCartDto.Patch.class);
        setField(patch, "count", PRODUCT_CART.getCount());

        String request = gson.toJson(patch);


        given(cartService.updateCart(any(ProductCart.class), eq(MEMBER.getId()))).willReturn(CART);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/carts/{product-cart-id}", PRODUCT_CART.getId())
                        .header("Authorization", "JWT")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request)
        );

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.cartId").value(CART.getId()))
                .andExpect(jsonPath("$.productCarts[0].productCartId").value(PRODUCT_CART.getId()))
                .andDo(document("carts/patch",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        PATH_PARAM_PRODUCT_CART_ID,
                        requestFields(
                                FWP_COUNT
                        ),
                        CART_RESPONSE_FIELDS
                ));
    }
}