package gohome.dailydaily.domain.order.controller;

import com.google.gson.Gson;
import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.domain.order.dto.OrderDto;
import gohome.dailydaily.domain.order.dto.OrderProductDto;
import gohome.dailydaily.domain.order.entity.Order;
import gohome.dailydaily.domain.order.mapper.OrderMapper;
import gohome.dailydaily.domain.order.mapper.OrderProductMapper;
import gohome.dailydaily.domain.order.service.OrderService;
import gohome.dailydaily.domain.product.service.ProductService;
import gohome.dailydaily.util.Reflection;
import gohome.dailydaily.util.security.SecurityTestConfig;
import gohome.dailydaily.util.security.WithMockCustomUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static gohome.dailydaily.util.TestConstant.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {OrderController.class, OrderMapper.class, OrderProductMapper.class})
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityTestConfig.class)
@AutoConfigureRestDocs
@WithMockCustomUser
class OrderControllerTest implements Reflection {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private OrderService orderService;
    @MockBean
    private ProductService productService;
    @MockBean
    private MemberService memberService;

    @Test
    void postOrder() throws Exception {
        OrderProductDto.Post postProduct1 = newInstance(OrderProductDto.Post.class);
        setField(postProduct1, "productId", PRODUCT1.getId());
        setField(postProduct1, "optionId", OPTION.getId());
        setField(postProduct1, "count", ORDER_PRODUCT1.getCount());

        OrderProductDto.Post postProduct2 = newInstance(OrderProductDto.Post.class);
        setField(postProduct2, "productId", PRODUCT2.getId());
        setField(postProduct2, "optionId", OPTION.getId());
        setField(postProduct2, "count", ORDER_PRODUCT2.getCount());

        List<OrderProductDto.Post> postProducts = new ArrayList<>(List.of(postProduct1, postProduct2));

        OrderDto.Post post = newInstance(OrderDto.Post.class);
        setField(post, "orderProducts", postProducts);

        String request = gson.toJson(post);

        given(orderService.createOrder(any(Order.class))).willReturn(ORDER);

        // when
        ResultActions actions = mockMvc.perform(
                post("/orders")
                        .header("Authorization", "JWT")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request)
        );

        // then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.orderId").value(ORDER.getId()))
                .andExpect(jsonPath("$.status").value(ORDER.getStatus().getMessage()))
                .andExpect(jsonPath("$.orderProducts[0].productId").value(ORDER_PRODUCT1.getProduct().getId()))
                .andExpect(jsonPath("$.orderProducts[0].brandName").value(PRODUCT1.getSeller().getMember().getNickname()))
                .andExpect(jsonPath("$.orderProducts[0].title").value(PRODUCT1.getTitle()))
                .andExpect(jsonPath("$.orderProducts[0].img.fileName").value(PRODUCT1.getImg().getFileName()))
                .andExpect(jsonPath("$.orderProducts[0].img.fullPath").value(PRODUCT1.getImg().getFullPath()))
                .andExpect(jsonPath("$.orderProducts[0].count").value(ORDER_PRODUCT1.getCount()))
                .andExpect(jsonPath("$.orderProducts[0].price").value(ORDER_PRODUCT1.getProduct().getPrice()))
                .andExpect(jsonPath("$.orderProducts[0].color").value(ORDER_PRODUCT1.getOption().getColor()))
                .andDo(document("orders/post",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        requestFields(
                                FWP_ORDER_PRODUCT_ID,
                                FWP_ORDER_OPTION_ID,
                                FWP_ORDER_COUNT
                        ),
                        ORDER_RESPONSE_FIELDS
                ));
    }

    @Test
    void getOrders() throws Exception {
        // given
        Page<Order> orders = new PageImpl<>(List.of(ORDER, ORDER1), PAGEABLE, 2);

        given(orderService.findByMember_Id(MEMBER.getId(), PAGEABLE))
                .willReturn(orders);

        // when
        ResultActions actions = mockMvc.perform(
                get("/orders")
                        .param("page", String.valueOf(PAGEABLE.getPageNumber()))
                        .param("size", String.valueOf(PAGEABLE.getPageSize()))
                        .param("sort", String.valueOf(PAGEABLE.getSort()).replace(": ", ","))
                        .header("Authorization", "JWT")
        );

        // then
        actions.andExpect(status().isOk())
                .andDo(document("orders/get",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        PAGE_ORDER_RESPONSE_FIELDS
                ));

    }

    @Test
    void cancelOrder() throws Exception {
        // given
        doNothing().when(orderService).cancelOrder(MEMBER.getId(), ORDER.getId());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/orders/{order-id}",
                        ORDER.getId())
                        .header("Authorization", "JWT")
        );

        // then
        actions.andExpect(status().isNoContent())
                .andDo(document("orders/delete",
                        REQUEST_PREPROCESSOR,
                        RESPONSE_PREPROCESSOR,
                        REQUEST_HEADER_JWT,
                        PATH_PARAM_ORDER_ID
                ));
    }
}
