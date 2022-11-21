package gohome.dailydaily.global.common.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import javax.validation.constraints.Min;

@Getter
@Setter
public class PagingRequestDto {

    @Min(value = 0)
    private int page = 0;
    @Range(min = 1, max = 1000)
    private int size = 20;

    public Pageable getPageRequest() {
        return PageRequest.of(this.page, this.size);
    }

}
