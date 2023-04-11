package gohome.dailydaily.domain.like.service;

import gohome.dailydaily.domain.like.entity.Like;
import gohome.dailydaily.domain.like.repository.LikeRepository;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.mapper.ProductMapper;
import gohome.dailydaily.domain.product.service.ProductService;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final ProductService productService;
    private final MemberService memberService;

    // 상품 좋아요 추가
    public Boolean addProductLike(Long memberId, Long productId) {
        if (likeRepository.existsByMember_IdAndProduct_Id(memberId, productId)) {
            throw new BusinessLogicException(ExceptionCode.LIKE_EXISTS);
        }
        Member member = memberService.findVerifiedMember(memberId);
        Product product = productService.getProduct(productId);

        Like like = Like.builder()
                .member(member)
                .product(product)
                .build();

        likeRepository.save(like);
        return true;
    }

    @Transactional(readOnly = true)
    public Page<Product> findLikeProductsByMemberId(Long memberId, Pageable pageable) {
        Page<Like> likes = likeRepository.findLikeByMember_Id(memberId, pageable);

        return likes.map(Like::getProduct);
    }

    // 상품 좋아요 취소
    public Boolean cancelProductLike(Long memberId, Long productId) {
        Like like = findVerifiedLike(memberId, productId);

        likeRepository.delete(like);
        return false;
    }

    public Like findVerifiedLike(Long memberId, Long productId) {
        return likeRepository.findByMember_IdAndProduct_Id(memberId, productId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND));
    }

    public Boolean getProductLike(Long memberId, Long productId) {
        Like like = likeRepository.findByMember_IdAndProduct_Id(memberId, productId)
                .orElse(null);
        boolean status = false;

        if (like != null) {
            status = true;
        }
        return status;
    }
}
