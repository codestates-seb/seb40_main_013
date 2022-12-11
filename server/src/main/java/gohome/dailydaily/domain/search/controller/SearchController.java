package gohome.dailydaily.domain.search.controller;

import gohome.dailydaily.domain.search.dto.SearchDto;
import gohome.dailydaily.domain.search.mapper.SearchMapper;
import gohome.dailydaily.domain.search.repository.SearchRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchMapper searchMapper;
    private final SearchRedisRepository searchRedisRepository;

    // 테스트용
    @GetMapping
    public void search(@PathParam("keyword") String keyword) {
        searchRedisRepository.addSearchCount(keyword);
    }

    @GetMapping("/rank")
    public List<SearchDto.RankResponse> getRank() {
        return searchMapper.toResponse(searchRedisRepository.getRankTop5());
    }
}
