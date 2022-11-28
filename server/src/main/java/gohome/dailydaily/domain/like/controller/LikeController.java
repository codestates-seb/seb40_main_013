package gohome.dailydaily.domain.like.controller;

import gohome.dailydaily.domain.like.service.LikeService;
import gohome.dailydaily.global.common.security.resolver.MemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@Transactional
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/products/{product-id}/likes")
    @ResponseStatus(HttpStatus.CREATED)
    public String postLike(@MemberId Long memberId,
                           @PathVariable("product-id") Long productId) {
        likeService.addProductLike(memberId, productId);

        return "Create Likes";
    }

    @DeleteMapping("/products/{product-id}/likes")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public String deleteLike(@MemberId Long memberId,
                             @PathVariable("product-id") Long productId) {
        likeService.cancelProductLike(memberId, productId);

        return "Cancel Likes";
    }
}
