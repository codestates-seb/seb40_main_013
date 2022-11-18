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

        productCart.addProduct(product);
        productCart.addOption(option);
        cart.addProductCart(productCart);

        return cartRepository.save(cart);
    }

    public Option findVerifiedOption(Product product, Long optionId) {
        Optional<Option> result = product.getOptions().stream()
                .filter(option -> option.getId().equals(optionId))
                .findFirst();

        return result.orElseThrow(() -> new BusinessLogicException(ExceptionCode.OPTION_NOT_FOUND));
    }

    public void cancelCart(Long productCartId, Long memberId) {

//        Cart cart = findVerifiedCart(memberId);
//        cart.getProductCarts().stream()
//                .filter(productCart -> !productCart.getId().equals(productCartId))
//                .collect(Collectors.toList());

//        cartRepository.save(cart);

        ProductCart productCart = productCartRepository.findProductCartById(productCartId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PRODUCT_CART_NOT_FOUND));

        if (!productCart.getCart().getMember().getId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.ID_DOES_NOT_MATCH);
        }

        productCartRepository.delete(productCart);
    }

    public Cart findVerifiedCart(Long memberId) {

        return cartRepository.findByMember_Id(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CART_NOT_FOUND));
    }
}
