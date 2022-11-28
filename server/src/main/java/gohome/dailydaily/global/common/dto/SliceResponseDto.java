package gohome.dailydaily.global.common.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Slice;

import java.util.List;

@Getter
@NoArgsConstructor
public class SliceResponseDto<T> {
    private List<T> content;
    private SliceInfo sliceInfo;

    public SliceResponseDto(Slice<T> slice) {
        this.content = slice.getContent();
        this.sliceInfo = SliceInfo.of(slice);
    }

    public static <T> SliceResponseDto<T> of(Slice<T> slice) {
        return new SliceResponseDto<>(slice);
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class SliceInfo {
        private int page;
        private int size;
        private boolean hasNext;

        public static <T> SliceInfo of(Slice<T> slice) {
            return new SliceInfo(slice.getNumber(),
                    slice.getSize(), slice.hasNext());
        }

    }

}
