package gohome.dailydaily.global.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import javax.validation.constraints.Min;

@Getter
@Setter
@ToString
public class PagingRequestDto {

    @Min(value = 0)
    private int page = 0;
    @Range(min = 1, max = 1000)
    private int size = 20;

    private String sortType = "createdAt";
    private Sort sort = Sort.by(sortType).descending();
    private String order = "desc";
    private Sort sort1 = Sort.by("createdAt").descending();
    public Pageable getPageRequest() {
        if (this.order.equals("asc")){
            return PageRequest.of(this.page, this.size, Sort.by(sortType).ascending().and(sort1));
        }

        return PageRequest.of(this.page, this.size, Sort.by(sortType).descending().and(sort1));
    }

}
