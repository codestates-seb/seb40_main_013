package gohome.dailydaily.domain.cart.service;

import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.cart.entity.ProductCart;
import gohome.dailydaily.domain.cart.repository.CartRepository;
import gohome.dailydaily.domain.cart.repository.ProductCartRepository;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.service.ProductService;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final ProductService productService;
    private final CartRepository cartRepository;
    private final ProductCartRepository productCartRepository;

    public Cart addCart(ProductCart productCart, Long memberId) {

        Cart cart = findVerifiedCart(memberId);
        Product product = productService.getProduct(productCart.getProduct().getId());
        Option option = findVerifiedOption(product, productCart.getOption().getId());

        // 장바구니 추가시 장바구니에 중복되는 옵션+상품이 존재하는지 확인
        Optional<ProductCart> findProductCart = cart.getProductCarts().stream()
                .filter(goods -> goods.getOption().getId().equals(option.getId())
                        && goods.getProduct().getId().equals(product.getId()))
                .findAny();

        if (findProductCart.isPresent()) {
            findProductCart.ifPresent(goods -> goods.updateCount(goods.getCount() + productCart.getCount()));
            return cart;
        }

        productCart.addProductAndOption(product, option);
        cart.addProductCart(productCart);

        productCartRepository.save(productCart);

        return cart;
    }

    public Option findVerifiedOption(Product product, Long optionId) {
        Optional<Option> result = product.getOptions().stream()
                .filter(option -> option.getId().equals(optionId))
                .findFirst();

        return result.orElseThrow(() -> new BusinessLogicException(ExceptionCode.OPTION_NOT_FOUND));
    }

    public void cancelCart(Long productCartId, Long memberId) {

        ProductCart productCart = productCartRepository.findProductCartById(productCartId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PRODUCT_CART_NOT_FOUND));

        if (!productCart.getCart().getMember().getId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.ID_DOES_NOT_MATCH);
        }

        productCartRepository.delete(productCart);
    }

    public Cart findVerifiedCart(Long memberId) {

        return cartRepository.findCartByMember_Id(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CART_NOT_FOUND));
    }

    public Cart getCart(Long memberId) {

        return findVerifiedCart(memberId);
    }

    public Cart updateCart(ProductCart productCart, Long memberId) {

        Cart cart = findVerifiedCart(memberId);
        Optional<ProductCart> findProductCart = cart.getProductCarts().stream()
                .filter(goods -> goods.getId().equals(productCart.getId()))
                .findAny();

        findProductCart.ifPresent(goods -> goods.updateCount(productCart.getCount()));

        return cart;
    }
}
