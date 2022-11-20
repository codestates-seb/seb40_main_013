package gohome.dailydaily.global.util.crawling;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.net.MalformedURLException;

@Controller
@Slf4j
@RequestMapping("/crawling")
@RequiredArgsConstructor
public class CrawlingController {
    private final CrawlingService service;

    @GetMapping("/product")
    @ResponseStatus(HttpStatus.OK)
    public void productCrawling() {

        String url = "https://ohou.se/productions/445617/selling?affect_type=StoreSearchResult&affect_id=1";

//        for (String url : urls) {
        log.info("@CrawlingController, productName url : " + url);
        service.crawling(url);
//        }
    }

    @GetMapping("/product/img")
    @ResponseStatus(HttpStatus.OK)
    public void productImage() {

        String url = "https://www.dodot.co.kr/new_shop/shop3.php?cd1=001";

//        for (String url : urls) {
        log.info("@CrawlingController, product url : " + url);
        service.urlDownload(url);
//        }
    }
}
