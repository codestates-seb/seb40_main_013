package gohome.dailydaily.global.common.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import javax.validation.constraints.Min;

@Getter
@Setter
public class PagingRequestDto {

    @Min(value = 0)
    private int page = 0;
    @Range(min = 1, max = 1000)
    private int size = 20;

    private String sortType = "createdAt";
    private Sort sort1 = Sort.by(sortType).descending();
    private Sort sort2 = Sort.by("createdAt").descending();
    private Sort sortAll;

    public Pageable getPageRequest() {
        this.sort1 = Sort.by(sortType).descending();
        this.sortAll = sort1.and(sort2);
        return PageRequest.of(this.page, this.size, this.sortAll);
    }

}
