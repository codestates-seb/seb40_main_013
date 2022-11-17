package gohome.dailydaily.domain.product.controller;

import com.google.gson.Gson;
import gohome.dailydaily.domain.member.mapper.SellerMapper;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.mapper.OptionMapper;
import gohome.dailydaily.domain.product.mapper.ProductMapper;
import gohome.dailydaily.domain.product.service.ProductService;
import gohome.dailydaily.domain.review.mapper.ReviewMapper;
import gohome.dailydaily.util.Reflection;
import gohome.dailydaily.util.security.SecurityTestConfig;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = {ProductController.class, ProductMapper.class, OptionMapper.class, SellerMapper.class, ReviewMapper.class})
@MockBean(JpaMetamodelMappingContext.class)
@Import(SecurityTestConfig.class)
@AutoConfigureRestDocs
public class ProductControllerTest implements Reflection {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private ProductService productService;

    @Test
    public void getProduct() throws Exception{
        Product product = newInstance(Product.class);
        setField(product, "id", 1L);
        setField(product, "title", "제목");
        setField(product,"img",null);
        setField(product,"content","내용");
        setField(product,"price",100000);
        setField(product,"score",3);
        setField(product,"seller","{}");
        setField(product,"category","{}");
        setField(product,"options","[id,color,size,stock]");
        setField(product,"reviews","[id,title,content]");
        given(productService.getProduct(Mockito.anyLong())).willReturn(product);

        ResultActions actions = mockMvc.perform(get("/products/1")
                .accept(MediaType.APPLICATION_JSON));

        MvcResult result = actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.productId").value(product.getId()))
                .andExpect(jsonPath("$.data.title").value(product.getTitle()))
                .andExpect(jsonPath("$.data.img").value(product.getImg()))
                .andExpect(jsonPath("$.data.content").value(product.getContent()))
                .andExpect(jsonPath("$.data.price").value(product.getPrice()))
                .andExpect(jsonPath("$.data.score").value(product.getScore()))
                .andExpect(jsonPath("$.data.seller").value(product.getSeller()))
                .andExpect(jsonPath("$.data.category").value(product.getCategory()))
                .andExpect(jsonPath("$.data.options").value(product.getOptions()))
                .andExpect(jsonPath("$.data.reviews").value(product.getReviews()))
                .andReturn();
    }

}
