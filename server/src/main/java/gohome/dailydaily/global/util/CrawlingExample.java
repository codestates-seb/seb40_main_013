package gohome.dailydaily.global.util;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CrawlingExample {

    /**
     * 조회할 URL 셋팅 및 Document 객체 로드하기
     * 두닷, 데스커, 포더홈, 소프시스
     */
    private static final String url = "https://www.dodot.co.kr/new_shop/shop3.php?cd1=001";
    public void process() {
        // Jsoup 커넥션 생성
        Connection conn = Jsoup.connect(url);

        Document document = null;
        try {
            // url 의 내용을 HTML Document 객체로 가져온다.
            document = conn.get();
        } catch (IOException e) {
            e.printStackTrace();
        }

        List<String> list = getDataList(document);
    }

    private List<String> getDataList(Document document) {
        List<String> list = new ArrayList<>();
        // select 메서드 안에 css selector 를 작성하여 Elements 를 가져올 수 있다.
        Elements selects = document.select(".sentence-list");

        for (Element select : selects) {
            // html(), text(), children(), append() ... 등 다양한 메서드 사용 가능
            System.out.println(select.html());
        }
        return list;
    }
}
