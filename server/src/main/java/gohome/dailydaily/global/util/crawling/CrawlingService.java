package gohome.dailydaily.global.util.crawling;

import gohome.dailydaily.domain.file.entity.File;
import gohome.dailydaily.domain.file.service.FileService;
import gohome.dailydaily.domain.product.dto.ProductDto;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.mapper.ProductMapper;
import gohome.dailydaily.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class CrawlingService implements Crawler {

    private final ProductRepository productRepository;
    private final ProductMapper mapper;
    private final FileService fileService;

    @Value("${file.productImg}")
    private String productImgPath;

    static List<Product> products = new ArrayList<>();

    public void crawling(String url) {

        Document doc = null;

        try {
            doc = Jsoup.connect(url).get();

            // <ul class="productList"> 태그 내부의 모든 내용이 담김
            Elements titleElements = doc.getElementsByClass("production-item__header__name");
            Elements priceElements = doc.getElementsByClass("production-item-price__price");
            Elements scoreElements = doc.getElementsByClass("avg");
//            Elements imageUrlElements = doc.select("ul.productList").select("li.productName");
//            Elements titleElements = doc.select("ul.productList").select("li.productName");
//            Elements titleElements = doc.select("ul.productList").select("li.productName");

            for (int i = 0; i < titleElements.size()-1; i++) {
                String productName = titleElements.get(i).text();
                String productPrice = priceElements.get(i).text();
                String productScore = scoreElements.get(i).text();
                log.info("Product URL: " + productName);
                log.info("Product URL: " + productPrice);
                productPrice = productPrice.replace(",","");
                productPrice = productPrice.replaceAll("\\W", "");


                Product postProduct = Product.builder()
                        .title(productName)
                        .content("test")
                        .price(Integer.parseInt(productPrice))
                        .score(Float.parseFloat(productScore))
                        .build();

                products.add(postProduct);
            }

            productRepository.saveAll(products);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // url 로 이미지 저장
    public void urlDownload(String url) {
        Document doc = null;

        try {
            doc = Jsoup.connect(url).get();
        } catch (IOException e) {
            e.printStackTrace();
        }

        // <ul class="productList"> 태그 내부의 모든 내용이 담김
        Elements elements = doc.getElementsByClass("lazy");

        for (int i = 1; i < elements.size(); i++) {
            String data = elements.get(i).attr("abs:data-original");
            log.info("Product URL: " + data);

            try {
                URL imgUrl = new URL(data);
                String extension = data.substring(data.lastIndexOf('.') + 1);

                BufferedImage image = ImageIO.read(imgUrl);
                String filename = UUID.randomUUID() + ".jpg";
                FileOutputStream file = new FileOutputStream(productImgPath + filename);
                ImageIO.write(image, extension, file);

                File productFile = new File(filename , productImgPath);

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
