package gohome.dailydaily.domain.product.entity.crawling;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
@RequestMapping("/crawling")
@RequiredArgsConstructor
public class CrawlingController {
    private final CrawlingService service;

    @GetMapping("/product")
    public void productName() {

        String url = "https://www.dodot.co.kr/new_shop/shop3.php?cd1=001";

//        for (String url : urls) {
        log.info("@CrawlingController, productName url : " + url);
        service.crawling(url);
//        }
    }
}
