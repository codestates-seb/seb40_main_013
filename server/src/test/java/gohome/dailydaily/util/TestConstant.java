package gohome.dailydaily.util;

import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.cart.entity.ProductCart;
import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberRole;
import gohome.dailydaily.domain.member.entity.MemberStatus;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.review.entity.Review;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.restdocs.headers.RequestHeadersSnippet;
import org.springframework.restdocs.operation.preprocess.OperationRequestPreprocessor;
import org.springframework.restdocs.operation.preprocess.OperationResponsePreprocessor;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.request.PathParametersSnippet;
import org.springframework.restdocs.request.RequestParametersSnippet;

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.JsonFieldType.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;

public class TestConstant {
    public static final Member MEMBER = Member.builder()
            .id(1L)
            .email("test@test.com")
            .nickname("닉네임")
            .password("비밀번호")
            .address("주소")
            .phone("010-1234-5678")
            .memberStatus(MemberStatus.ACTIVE)
            .build();
    public static final Seller SELLER = Seller.builder()
            .id(1L)
            .brandNumber("53-215-6262463")
            .member(MEMBER)
            .build();

    public static final File FILE = File.builder()
            .fileName("fileName")
            .fullPath("fullPath")
            .build();
    public static final Product PRODUCT = Product.builder()
            .id(1L)
            .title("productTest")
            .content("test")
            .img(FILE)
            .price(10000)
            .score(45)
            .seller(SELLER)
            .build();

    public static final Option OPTION = Option.builder()
            .id(1L)
            .price(10000)
            .product(PRODUCT).build();

    public static final ProductCart PRODUCT_CART = ProductCart.builder()
            .id(1L)
            .count(2)
            .product(PRODUCT)
            .option(OPTION)
            .build();
    public static final Cart CART = Cart.builder()
            .id(1L)
            .member(MEMBER)
            .build();

    public static final Pageable PAGEABLE = PageRequest.of(0, 20, Sort.by("createdAt").descending());

    public static final Product PRODUCT1 = Product.builder()
            .id(1L)
            .title("상품 이름1")
            .content("상품 내용1")
            .price(123456)
            .build();
    public static final Product PRODUCT2 = Product.builder()
            .id(2L)
            .title("상품 이름2")
            .content("상품 내용2")
            .price(100000)
            .build();

    public static final Review REVIEW1 = Review.builder()
            .id(1L)
            .title("리뷰 제목1")
            .content("리뷰 내용1")
            .score(50)
            .product(PRODUCT1)
            .build();
    public static final Review REVIEW2 = Review.builder()
            .id(2L)
            .title("리뷰 제목2")
            .content("리뷰 내용2")
            .score(35)
            .product(PRODUCT2)
            .build();


    public static final OperationRequestPreprocessor REQUEST_PREPROCESSOR =
            preprocessRequest(
                    modifyUris()
                            .scheme("https")
                            .host("api.dailydaily.com")
                            .removePort(),
                    prettyPrint()
            );
    public static final OperationResponsePreprocessor RESPONSE_PREPROCESSOR = preprocessResponse(prettyPrint());

    public static final RequestHeadersSnippet REQUEST_HEADER_JWT = requestHeaders(
            headerWithName("Authorization").description("JWT 토큰")
    );

    public static final RequestParametersSnippet REQUEST_PARAM_PAGE = requestParameters(
            parameterWithName("page").description("페이지"),
            parameterWithName("size").description("사이즈"),
            parameterWithName("sort").description("정렬 기준")
    );

    public static final PathParametersSnippet PATH_PARAM_PRODUCT_ID = pathParameters(
            parameterWithName("product-id").description("상품 식별자")
    );

    public static final PathParametersSnippet PATH_PARAM_PRODUCT_ID_AND_REVIEW_ID = pathParameters(
            parameterWithName("product-id").description("상품 식별자"),
            parameterWithName("review-id").description("리뷰 식별자")
    );

    public static final FieldDescriptor FWP_MEMBER_ID = fieldWithPath("memberId").type(NUMBER).description("멤버 식별자");
    public static final FieldDescriptor FWP_EMAIL = fieldWithPath("email").type(STRING).description("이메일");
    public static final FieldDescriptor FWP_NICKNAME = fieldWithPath("nickname").type(STRING).description("닉네임");
    public static final FieldDescriptor FWP_ADDRESS = fieldWithPath("address").type(STRING).description("주소");
    public static final FieldDescriptor FWP_PHONE = fieldWithPath("phone").type(STRING).description("휴대폰 번호");
    public static final FieldDescriptor FWP_MEMBER_STATUS = fieldWithPath("memberStatus").type(STRING).description("멤버 상태");
    public static final FieldDescriptor FWP_PASSWORD = fieldWithPath("password").type(STRING).description("비밀번호");

    public static final ResponseFieldsSnippet MEMBER_RESPONSE_FIELDS = responseFields(
            FWP_MEMBER_ID, FWP_NICKNAME, FWP_EMAIL, FWP_ADDRESS, FWP_PHONE, FWP_MEMBER_STATUS
    );

    public static final FieldDescriptor FWP_CONTENT = fieldWithPath("content").type(ARRAY).description("데이터");

    public static final FieldDescriptor FWP_SLICE_INFO = fieldWithPath("sliceInfo").type(OBJECT).description("슬라이스 정보");
    public static final FieldDescriptor FWP_SLICE_INFO_PAGE = fieldWithPath("sliceInfo.page").type(NUMBER).description("페이지");
    public static final FieldDescriptor FWP_SLICE_INFO_SIZE = fieldWithPath("sliceInfo.size").type(NUMBER).description("사이즈");
    public static final FieldDescriptor FWP_SLICE_INFO_HAS_NEXT = fieldWithPath("sliceInfo.hasNext").type(BOOLEAN).description("다음 슬라이스 존재 여부");

    public static final FieldDescriptor FWP_PAGE_INFO = fieldWithPath("pageInfo").type(OBJECT).description("페이지 정보");
    public static final FieldDescriptor FWP_PAGE_INFO_PAGE = fieldWithPath("pageInfo.page").type(NUMBER).description("페이지");
    public static final FieldDescriptor FWP_PAGE_INFO_SIZE = fieldWithPath("pageInfo.size").type(NUMBER).description("사이즈");
    public static final FieldDescriptor FWP_PAGE_INFO_TOTAL_ELEMENTS = fieldWithPath("pageInfo.totalElements").type(NUMBER).description("총 원소 개수");
    public static final FieldDescriptor FWP_PAGE_INFO_TOTAL_PAGES = fieldWithPath("pageInfo.totalPages").type(NUMBER).description("총 페이지 개수");

    public static final FieldDescriptor FWP_CONTENT_REVIEW_ID = fieldWithPath("content[].reviewId").type(NUMBER).description("리뷰 식별자");
    public static final FieldDescriptor FWP_CONTENT_REVIEW_TITLE = fieldWithPath("content[].title").type(STRING).description("리뷰 제목");
    public static final FieldDescriptor FWP_CONTENT_REVIEW_CONTENT = fieldWithPath("content[].content").type(STRING).description("리뷰 내용");
    public static final FieldDescriptor FWP_CONTENT_REVIEW_SCORE = fieldWithPath("content[].score").type(NUMBER).description("리뷰 별점");

    public static final FieldDescriptor FWP_CONTENT_PRODUCT_ID = fieldWithPath("content[].productId").type(NUMBER).description("상품 식별자");
    public static final FieldDescriptor FWP_CONTENT_PRODUCT_TITLE = fieldWithPath("content[].productTitle").type(STRING).description("상품 이름");

    public static final FieldDescriptor FWP_REVIEW_ID = fieldWithPath("reviewId").type(NUMBER).description("리뷰 식별자");
    public static final FieldDescriptor FWP_REVIEW_TITLE = fieldWithPath("title").type(STRING).description("리뷰 제목");
    public static final FieldDescriptor FWP_REVIEW_CONTENT = fieldWithPath("content").type(STRING).description("리뷰 내용");
    public static final FieldDescriptor FWP_REVIEW_SCORE = fieldWithPath("score").type(NUMBER).description("리뷰 별점");

    public static final FieldDescriptor FWP_PRODUCT_ID = fieldWithPath("productId").type(NUMBER).description("상품 식별자");
    public static final FieldDescriptor FWP_PRODUCT_TITLE = fieldWithPath("productTitle").type(STRING).description("상품 이름");
    public static final FieldDescriptor FWP_CART_ID = fieldWithPath("cartId").type(NUMBER).description("장바구니 식별자");
    public static final FieldDescriptor FWP_OPTION_ID = fieldWithPath("optionId").type(NUMBER).description("상품 옵션 식별자");
    public static final FieldDescriptor FWP_PRODUCT_CART_ID = fieldWithPath("productCarts[].productCartId").type(NUMBER).description("장바구니 상품 식별자");
    public static final FieldDescriptor FWP_PRODUCT_CART_IMG_NAME = fieldWithPath("productCarts[].img.fileName").type(STRING).description("장바구니 상품 이미지 이름");
    public static final FieldDescriptor FWP_PRODUCT_CART_IMG_PATH = fieldWithPath("productCarts[].img.fullPath").type(STRING).description("장바구니 상품 이미지 경로");
    public static final FieldDescriptor FWP_PRODUCT_CART_TITLE = fieldWithPath("productCarts[].title").type(STRING).description("장바구니 상품명");
    public static final FieldDescriptor FWP_PRODUCT_CART_COUNT = fieldWithPath("productCarts[].count").type(NUMBER).description("장바구니 상품 수량");
    public static final FieldDescriptor FWP_PRODUCT_CART_PRICE = fieldWithPath("productCarts[].price").type(NUMBER).description("장바구니 상품 가격");
    public static final FieldDescriptor FWP_COUNT = fieldWithPath("count").type(NUMBER).description("상품 수량");

    public static final ResponseFieldsSnippet REVIEW_RESPONSE_FIELDS = responseFields(
            FWP_REVIEW_ID, FWP_PRODUCT_ID, FWP_PRODUCT_TITLE, FWP_REVIEW_TITLE, FWP_REVIEW_CONTENT, FWP_REVIEW_SCORE
    );

    static {
        MEMBER.addRoles(MemberRole.USER);
        PRODUCT.addOptions(OPTION);
        CART.addProductCart(PRODUCT_CART);
    }

}
