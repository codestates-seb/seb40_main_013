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
                "https://ohou.se/productions/178742/selling?affect_type=StoreSearchResult&affect_id=10",
                "https://ohou.se/productions/352379/selling?affect_type=StoreSearchResult&affect_id=11",
                "https://ohou.se/productions/421623/selling?affect_type=StoreSearchResult&affect_id=13",
                "https://ohou.se/productions/445507/selling?affect_type=StoreSearchResult&affect_id=14",
                "https://ohou.se/productions/100177/selling?affect_type=StoreSearchResult&affect_id=15",
                "https://ohou.se/productions/1148952/selling?affect_type=StoreSearchResult&affect_id=16",
                "https://ohou.se/productions/100175/selling?affect_type=StoreSearchResult&affect_id=17",
                "https://ohou.se/productions/445504/selling?affect_type=StoreSearchResult&affect_id=19",
                "https://ohou.se/productions/343641/selling?affect_type=StoreSearchResult&affect_id=20",
                "https://ohou.se/productions/343919/selling?affect_type=StoreSearchResult&affect_id=21",
                "https://ohou.se/productions/667500/selling?affect_type=StoreSearchResult&affect_id=22",
                "https://ohou.se/productions/445262/selling?affect_type=StoreSearchResult&affect_id=23",
                "https://ohou.se/productions/1190400/selling?affect_type=StoreSearchResult&affect_id=24",
                "https://ohou.se/productions/365916/selling?affect_type=StoreSearchResult&affect_id=26",
                "https://ohou.se/productions/968318/selling?affect_type=StoreSearchResult&affect_id=28",
                "https://ohou.se/productions/445503/selling?affect_type=StoreSearchResult&affect_id=29",
                "https://ohou.se/productions/344429/selling?affect_type=StoreSearchResult&affect_id=32",
                "https://ohou.se/productions/1068533/selling?affect_type=StoreSearchResult&affect_id=33",
                "https://ohou.se/productions/445263/selling?affect_type=StoreSearchResult&affect_id=34",
                "https://ohou.se/productions/445502/selling?affect_type=StoreSearchResult&affect_id=35",
                "https://ohou.se/productions/352391/selling?affect_type=StoreSearchResult&affect_id=37",
                "https://ohou.se/productions/667502/selling?affect_type=StoreSearchResult&affect_id=38",
                "https://ohou.se/productions/599023/selling?affect_type=StoreSearchResult&affect_id=39",
                "https://ohou.se/productions/1068515/selling?affect_type=StoreSearchResult&affect_id=41",
                "https://ohou.se/productions/1007860/selling?affect_type=StoreSearchResult&affect_id=42",
                "https://ohou.se/productions/365917/selling?affect_type=StoreSearchResult&affect_id=43",
                "https://ohou.se/productions/667499/selling?affect_type=StoreSearchResult&affect_id=44",
                "https://ohou.se/productions/422550/selling?affect_type=StoreSearchResult&affect_id=45",
                "https://ohou.se/productions/1081097/selling?affect_type=StoreSearchResult&affect_id=46",
                "https://ohou.se/productions/1169760/selling?affect_type=StoreSearchResult&affect_id=47",
                "https://ohou.se/productions/343870/selling?affect_type=StoreSearchResult&affect_id=48",
                "https://ohou.se/productions/1164106/selling?affect_type=StoreSearchResult&affect_id=49",
                "https://ohou.se/productions/1164105/selling?affect_type=StoreSearchResult&affect_id=51",
                "https://ohou.se/productions/422551/selling?affect_type=StoreSearchResult&affect_id=52",
                "https://ohou.se/productions/1081100/selling?affect_type=StoreSearchResult&affect_id=54",
                "https://ohou.se/productions/1148951/selling?affect_type=StoreSearchResult&affect_id=55",
                "https://ohou.se/productions/352346/selling?affect_type=StoreSearchResult&affect_id=56",
                "https://ohou.se/productions/445458/selling?affect_type=StoreSearchResult&affect_id=58",
                "https://ohou.se/productions/1169765/selling?affect_type=StoreSearchResult&affect_id=59",
                "https://ohou.se/productions/100176/selling?affect_type=StoreSearchResult&affect_id=61",
                "https://ohou.se/productions/435107/selling?affect_type=StoreSearchResult&affect_id=64",
                "https://ohou.se/productions/344432/selling?affect_type=StoreSearchResult&affect_id=65",
                "https://ohou.se/productions/667501/selling?affect_type=StoreSearchResult&affect_id=66",
                "https://ohou.se/productions/1164109/selling?affect_type=StoreSearchResult&affect_id=67",
                "https://ohou.se/productions/1215389/selling?affect_type=StoreSearchResult&affect_id=68",
                "https://ohou.se/productions/1097310/selling?affect_type=StoreSearchResult&affect_id=77"
        };

        service.crawling(urls);
    }

    @GetMapping("/product/setting")
    @ResponseStatus(HttpStatus.OK)
    public void productCategory() throws Exception {

        service.crawlingSetting();
    }
}
