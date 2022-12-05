package gohome.dailydaily.domain.like.controller;

import gohome.dailydaily.domain.like.service.LikeService;
import gohome.dailydaily.global.common.security.resolver.MemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@Validated
@RestController
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/products/{product-id}/likes")
    @ResponseStatus(HttpStatus.CREATED)
    @CacheEvict(key = "#productId +\":\" + #memberId", value = "getProduct")
    public Boolean postLike(@MemberId Long memberId,
                            @Positive @PathVariable("product-id") Long productId) {
        return likeService.addProductLike(memberId, productId);
    }

    @DeleteMapping("/products/{product-id}/likes")
    @ResponseStatus(HttpStatus.OK)
    @CacheEvict(key = "#productId +\":\" + #memberId", value = "getProduct")
    public Boolean deleteLike(@MemberId Long memberId,
                              @Positive @PathVariable("product-id") Long productId) {
        return likeService.cancelProductLike(memberId, productId);
    }

    @GetMapping("/products/{product-id}/likes")
    public Boolean getLike(@AuthenticationPrincipal Long memberId,
                           @Positive @PathVariable("product-id") Long productId) {
        return likeService.getProductLike(memberId, productId);
    }
}
