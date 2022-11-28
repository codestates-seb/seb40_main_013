package gohome.dailydaily.domain.like.service;

import gohome.dailydaily.domain.like.entity.Like;
import gohome.dailydaily.domain.like.repository.LikeRepository;
import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.service.MemberService;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.entity.Product;
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
    public void addProductLike(Long memberId, Long productId) {
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
    }

    @Transactional(readOnly = true)
    public Page<Product> findLikeProductsByMemberId(Long memberId, Pageable pageable) {
        Page<Like> likes = likeRepository.findLikeByMember_Id(memberId, pageable);
        List<Product> productList = likes.getContent().stream().map(Like::getProduct).collect(Collectors.toList());

        return new PageImpl<>(productList, likes.getPageable(), likes.getTotalElements());
    }

    // 상품 좋아요 취소
    public void cancelProductLike(Long memberId, Long productId) {
        Like like = findVerifiedLike(memberId, productId);

        likeRepository.delete(like);
    }

    public Like findVerifiedLike(Long memberId, Long productId) {
        return likeRepository.findByMember_IdAndProduct_Id(memberId, productId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND));
    }

}
