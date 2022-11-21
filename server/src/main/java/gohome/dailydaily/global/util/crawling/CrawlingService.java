package gohome.dailydaily.global.util.crawling;

import com.google.gson.Gson;
import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.file.service.FileService;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberRole;
import gohome.dailydaily.domain.member.entity.MemberStatus;
import gohome.dailydaily.domain.member.entity.Seller;
import gohome.dailydaily.domain.member.repository.MemberRepository;
import gohome.dailydaily.domain.member.repository.SellerRepository;
import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Category;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.mapper.ProductMapper;
import gohome.dailydaily.domain.product.repository.CategoryRepository;
import gohome.dailydaily.domain.product.repository.ProductRepository;
import gohome.dailydaily.domain.review.entity.Review;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;
import java.util.stream.Collectors;

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
//            Member member = Member.builder()
//                    .email("hgd11@gmail.com")
//                    .nickname("데스커")
//                    .password("비밀번호")
//                    .address("주소")
//                    .phone("010-1234-5678")
//                    .memberStatus(MemberStatus.ACTIVE)
//                    .build();
//
//            member.addRoles(MemberRole.USER);

//            Seller seller = Seller.builder()
//                    .brandNumber("35-12-315253")
//                    .member(member)
//                    .build();

//            Category category = Category.builder()
//                    .main("서재")
//                    .sub("책상")
//                    .build();
            Category category = categoryRepository.findByMainAndSub("서재", "책상");
            Seller seller = sellerRepository.findById(1L).get();

            for (int i = 1; i <= urls.length; i++) {
                final String url = "https://ohou.se/productions/460766/selling?affect_type=StoreSearchResult&affect_id=1";
                Document document = Jsoup.connect(url).maxBodySize(0).get();
                document.outputSettings().prettyPrint(false);

                // 크롤링 항목 필요 리스트
                //   - 썸네일 링크, 강의 제목, 가격(할인가격), 평점, 강의자, 강의 링크, 수강자 수, 플랫폼, 강의 세션 개수 + 시간
                Elements imageUrlElements = document.getElementsByClass("production-selling-cover-image__entry__image");
                Elements titleElements = document.getElementsByClass("production-selling-header__title__name");
                Elements priceElements = document.getElementsByClass("production-selling-header__price__original");
                Elements sellerElements = document.getElementsByClass("production-selling-header__title__brand");
                Elements contentsElements = document.getElementsByClass("production-selling-description__content");
                Elements optionsElements = document.getElementsByTag("select");

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
                    final String price = priceElements.get(j).text();
                    final int intPrice = toInt(removeNotNumeric(price));
                    final String sellerName = sellerElements.get(j).text();
                    final String contentsLink = new Gson().toJson(contents);
                    final String options = optionsElements.get(j).text();

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
                    .fullPath(productImgPath)
                    .build();

        return productFile;
    }

}
