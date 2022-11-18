package gohome.dailydaily.domain.cart.controller;

import gohome.dailydaily.domain.cart.mapper.CartMapper;
import gohome.dailydaily.domain.cart.mapper.ProductCartMapper;
import gohome.dailydaily.domain.member.controller.MemberController;
import gohome.dailydaily.domain.member.mapper.MemberMapper;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(controllers = {CartController.class, CartMapper.class, ProductCartMapper.class})
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
class CartControllerTest {

    @Test
    void postCart() {
    }
}