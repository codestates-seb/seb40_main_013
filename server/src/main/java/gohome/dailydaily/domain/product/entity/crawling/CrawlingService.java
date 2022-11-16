package gohome.dailydaily.domain.product.entity.crawling;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CrawlingService implements Crawler {

    private final ProductRepository productRepository;

    public void crawling(String url) {

        Document doc = null;
        List<ProductVO> products = new ArrayList<>();

        try {
            doc = Jsoup.connect(url).get();
        } catch (IOException e) {
            e.printStackTrace();
        }

        // <ul class="productList"> 태그 내부의 모든 내용이 담김
        Elements elements = doc.select("ul.productList");

        // element 가 갖고있는 내용 중 <li class="productName elideText", originalPrice> 을 모두 가져옴
        Iterator<Element> element = elements.select("li.productName").iterator();

        long i = 1L;
        while (element.hasNext()) {
            String name = element.next().text();
            ProductVO product = ProductVO.builder()
                    .id(i++)
                    .title(name)
                    .price(5000)
                    .build();

            log.info("Product Name: " + name);
            products.add(product);

            productRepository.save(product);
        }
    }
}
