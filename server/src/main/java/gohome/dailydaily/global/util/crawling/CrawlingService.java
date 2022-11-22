package gohome.dailydaily.global.util.crawling;

import com.google.gson.Gson;
import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberRole;
import gohome.dailydaily.domain.member.entity.MemberStatus;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.member.repository.SellerRepository;
import gohome.dailydaily.domain.product.entity.Category;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.repository.CategoryRepository;
import gohome.dailydaily.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.FileOutputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class CrawlingService {

    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;
    private final CategoryRepository categoryRepository;

    @Value("${file.productImg}")
    private String productImgPath;

    static List<Product> products = new ArrayList<>();

    public void crawling(String[] urls) {

        Document doc = null;

        try {
            // 개발 강의 모든 페이징 순회

            Category category = categoryRepository.findByMainAndSub("서재", "의자");
            Seller seller = sellerRepository.findById(3L).get();

            for (int i = 0; i < urls.length; i++) {
                final String url = urls[i];
                Document document = Jsoup.connect(url).maxBodySize(0).get();
                document.outputSettings().prettyPrint(false);

                // 크롤링 항목 필요 리스트
                //   - 썸네일 링크, 강의 제목, 가격(할인가격), 평점, 강의자, 강의 링크, 수강자 수, 플랫폼, 강의 세션 개수 + 시간
                Elements imageUrlElements = document.getElementsByClass("production-selling-cover-image__entry__image");
                Elements titleElements = document.getElementsByClass("production-selling-header__title__name");
                Elements priceElements = document.getElementsByClass("production-selling-header__price__price");
                Elements sellerElements = document.getElementsByClass("production-selling-header__title__brand");
                Elements contentsElements = document.getElementsByClass("production-selling-description__content");
//                Elements optionsElements = document.getElementsByTag("select");

                String[] imageUrls = new String[imageUrlElements.size()];

                int setIndex = 0;
                int getIndex = 0;

//                for (Element e : imageUrlElements) {
//                    imageUrls[setIndex++] =
//                }
                List<String> contents = new ArrayList<>();
                for (Element e : contentsElements.select("img")) {
                    contents.add(e.attr("abs:src"));
                }

                for (int j = 0; j < titleElements.size(); j++) {
                    final String image = imageUrlElements.attr("abs:src");
                    final String title = titleElements.get(j).text();
                    log.info("상품명: " + title);
                    final String price = priceElements.get(j).text();
                    final int intPrice = toInt(removeNotNumeric(price));
                    final String sellerName = sellerElements.get(j).text();
                    final String contentsLink = new Gson().toJson(contents);
//                    final String options = optionsElements.get(j).text();

//                    System.out.println("썸네일: " + imageUrls[j]);
//                    System.out.println("상품명: " + title);
//                    System.out.println("가격: " + intPrice);
//                    System.out.println("판매자: " + sellerName);
//                    System.out.println("\"상품 내용\": " + new Gson().fromJson(contentsLink, List.class));
//                    System.out.println("상품 옵션: " + options);

                    Product product = Product.builder()
                            .title(title)
                            .img(urlDownload(image))
                            .price(intPrice)
                            .seller(seller)
                            .score(5)
                            .category(category)
                            .content(contentsLink)
                            .build();

                    productRepository.save(product);
                }
            }
//            productRepository.saveAll(products);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String removeNotNumeric(final String str) {
        return str.replaceAll("\\W", "");
    }

    private int toInt(final String str) {
        return Integer.parseInt(str);
    }

    // url 로 이미지 저장
    public File urlDownload(String url) throws Exception {

        URL imgUrl = new URL(url);

        BufferedImage image = ImageIO.read(imgUrl);
        String filename = UUID.randomUUID() + ".jpg";
        FileOutputStream file = new FileOutputStream(productImgPath + filename);
        ImageIO.write(image, "jpg", file);

        File productFile = File.builder()
                .fileName(filename)
                .fullPath("https://13-dailydaily.s3.ap-northeast-2.amazonaws.com/img/productImg/" + filename)
                .build();

        return productFile;
    }

    public void crawlingSetting() {

        List<Seller> sellers = new ArrayList<>();
        Member member1 = Member.builder()
                .email("desker@gmail.com")
                .nickname("데스커")
                .password("비밀번호")
                .address("주소")
                .phone("010-1234-5678")
                .memberStatus(MemberStatus.ACTIVE)
                .build();
        Cart cart1 = Cart.builder().member(member1).build();
        member1.setCart(cart1);

        member1.addRoles(MemberRole.USER);

        Seller seller1 = Seller.builder()
                .brandNumber("35-12-315253")
                .member(member1)
                .build();
        sellers.add(seller1);

        Member member2 = Member.builder()
                .email("dodot@gmail.com")
                .nickname("두닷")
                .password("비밀번호")
                .address("주소")
                .phone("010-1234-5678")
                .memberStatus(MemberStatus.ACTIVE)
                .build();
        Cart cart2 = Cart.builder().member(member2).build();
        member2.setCart(cart2);

        member2.addRoles(MemberRole.USER);

        Seller seller2 = Seller.builder()
                .brandNumber("22-12-136436")
                .member(member2)
                .build();
        sellers.add(seller2);

        Member member3 = Member.builder()
                .email("marketbe@gmail.com")
                .nickname("마켓비")
                .password("비밀번호")
                .address("주소")
                .phone("010-1234-5678")
                .memberStatus(MemberStatus.ACTIVE)
                .build();
        Cart cart3 = Cart.builder().member(member3).build();
        member3.setCart(cart3);

        member3.addRoles(MemberRole.USER);

        Seller seller3 = Seller.builder()
                .brandNumber("23-17-321614")
                .member(member3)
                .build();
        sellers.add(seller3);

        Member member4 = Member.builder()
                .email("hyudo@gmail.com")
                .nickname("휴도")
                .password("비밀번호")
                .address("주소")
                .phone("010-1234-5678")
                .memberStatus(MemberStatus.ACTIVE)
                .build();
        Cart cart4 = Cart.builder().member(member4).build();
        member4.setCart(cart4);

        member4.addRoles(MemberRole.USER);

        Seller seller4 = Seller.builder()
                .brandNumber("33-27-312123")
                .member(member4)
                .build();
        sellers.add(seller4);

        Member member5 = Member.builder()
                .email("sofsys@gmail.com")
                .nickname("소프시스")
                .password("비밀번호")
                .address("주소")
                .phone("010-1234-5678")
                .memberStatus(MemberStatus.ACTIVE)
                .build();
        Cart cart5 = Cart.builder().member(member5).build();
        member5.setCart(cart5);

        member5.addRoles(MemberRole.USER);

        Seller seller5 = Seller.builder()
                .brandNumber("31-17-235123")
                .member(member5)
                .build();
        sellers.add(seller5);

        Member member6 = Member.builder()
                .email("roomnhome@gmail.com")
                .nickname("룸앤홈")
                .password("비밀번호")
                .address("주소")
                .phone("010-1234-5678")
                .memberStatus(MemberStatus.ACTIVE)
                .build();
        Cart cart6 = Cart.builder().member(member6).build();
        member6.setCart(cart6);

        member6.addRoles(MemberRole.USER);

        Seller seller6 = Seller.builder()
                .brandNumber("12-51-132167")
                .member(member6)
                .build();
        sellers.add(seller6);

        sellerRepository.saveAll(sellers);

        /*--------------------------------------------------------------------------------*/
        List<Category> categories = new ArrayList<>();

        Category category0 = Category.builder()
                .main("서재")
                .sub("책상")
                .build();
        categories.add(category0);
        Category category1 = Category.builder()
                .main("서재")
                .sub("의자")
                .build();
        categories.add(category1);
        Category category2 = Category.builder()
                .main("서재")
                .sub("책장")
                .build();
        categories.add(category2);
        Category category3 = Category.builder()
                .main("서재")
                .sub("선반")
                .build();
        categories.add(category3);
        Category category4 = Category.builder()
                .main("침실")
                .sub("침대/매트리스")
                .build();
        categories.add(category4);
        Category category5 = Category.builder()
                .main("침실")
                .sub("행거/옷장")
                .build();
        categories.add(category5);
        Category category6 = Category.builder()
                .main("침실")
                .sub("화장대")
                .build();
        categories.add(category6);
        Category category7 = Category.builder()
                .main("거실")
                .sub("소파")
                .build();
        categories.add(category7);
        Category category8 = Category.builder()
                .main("거실")
                .sub("거실장")
                .build();
        categories.add(category8);
        Category category9 = Category.builder()
                .main("거실")
                .sub("수납장")
                .build();
        categories.add(category9);
        Category category10 = Category.builder()
                .main("주방")
                .sub("식탁/아일랜드")
                .build();
        categories.add(category10);
        Category category11 = Category.builder()
                .main("주방")
                .sub("식탁의자")
                .build();
        categories.add(category11);
        Category category12 = Category.builder()
                .main("주방")
                .sub("주방수납")
                .build();
        categories.add(category12);

        categoryRepository.saveAll(categories);

    }

}
