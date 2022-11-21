package gohome.dailydaily.global.util.crawling;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@Slf4j
@RequestMapping("/crawling")
@RequiredArgsConstructor
public class CrawlingController {
    private final CrawlingService service;

    @GetMapping("/product")
    @ResponseStatus(HttpStatus.OK)
    public void productCrawling() {

        String[] urls = {
                "https://ohou.se/productions/445617/selling?affect_type=StoreSearchResult&affect_id=1",
                "https://ohou.se/productions/445501/selling?affect_type=StoreSearchResult&affect_id=2",
                "https://ohou.se/productions/343827/selling?affect_type=StoreSearchResult&affect_id=3",
                "https://ohou.se/productions/352396/selling?affect_type=StoreSearchResult&affect_id=4",
                "https://ohou.se/productions/436174/selling?affect_type=StoreSearchResult&affect_id=5",
                "https://ohou.se/productions/348564/selling?affect_type=StoreSearchResult&affect_id=6",
                "https://ohou.se/productions/421624/selling?affect_type=StoreSearchResult&affect_id=7",
                "https://ohou.se/productions/445619/selling?affect_type=StoreSearchResult&affect_id=8",
                "https://ohou.se/productions/100174/selling?affect_type=StoreSearchResult&affect_id=9",
                "https://ohou.se/productions/178742/selling?affect_type=StoreSearchResult&affect_id=10"
        };

        service.crawling(urls);
    }

    @GetMapping("/product/img")
    @ResponseStatus(HttpStatus.OK)
    public void productImage() throws Exception {

        String url = "https://www.dodot.co.kr/new_shop/shop3.php?cd1=001";

//        for (String url : urls) {
        log.info("@CrawlingController, product url : " + url);
        service.urlDownload(url);
//        }
    }
}
