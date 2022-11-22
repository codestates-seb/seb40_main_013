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
                "https://ohou.se/productions/819548/selling?affect_type=StoreSearchResult&affect_id=1",
                "https://ohou.se/productions/148575/selling?affect_type=StoreSearchResult&affect_id=2",
                "https://ohou.se/productions/146960/selling?affect_type=StoreSearchResult&affect_id=3",
                "https://ohou.se/productions/146959/selling?affect_type=StoreSearchResult&affect_id=4",
                "https://ohou.se/productions/146957/selling?affect_type=StoreSearchResult&affect_id=5",
                "https://ohou.se/productions/146955/selling?affect_type=StoreSearchResult&affect_id=7",
                "https://ohou.se/productions/146889/selling?affect_type=StoreSearchResult&affect_id=8",
                "https://ohou.se/productions/141669/selling?affect_type=StoreSearchResult&affect_id=9",
                "https://ohou.se/productions/116972/selling?affect_type=StoreSearchResult&affect_id=11",
                "https://ohou.se/productions/54418/selling?affect_type=StoreSearchResult&affect_id=13",
                "https://ohou.se/productions/54417/selling?affect_type=StoreSearchResult&affect_id=14"
        };

        service.crawling(urls);
    }

    @GetMapping("/product/setting")
    @ResponseStatus(HttpStatus.OK)
    public void productCategory() throws Exception {

        service.crawlingSetting();
    }
}
