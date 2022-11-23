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


        };

        service.crawling(urls);
    }

    @GetMapping("/product/setting")
    @ResponseStatus(HttpStatus.OK)
    public void productCategory() throws Exception {

        service.crawlingSetting();
    }
}
