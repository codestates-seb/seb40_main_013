package gohome.dailydaily.domain.cart.service;

import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.cart.entity.ProductCart;
import gohome.dailydaily.domain.cart.repository.CartRepository;
import gohome.dailydaily.domain.product.entity.Option;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.service.ProductService;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    private final ProductService productService;
    private final CartRepository cartRepository;
    public Cart addCart(ProductCart productCart, Long memberId) {
        
        Cart cart = findVerifiedCart(memberId);
        Product product = productService.getProduct(productCart.getProduct().getId());
        Option option = findVerifiedOption(product, productCart.getOption().getId());

        productCart.addCart(cart);
        productCart.addProduct(product);
        productCart.addOption(option);

        cart.addProductCart(productCart);

        return cartRepository.save(cart);
    }

    public Option findVerifiedOption(Product product, Long optionId) {
        Optional<Option> result = product.getOptions().stream()
                        .filter(option -> option.getId() == optionId)
                .findFirst();

        return result.orElseThrow(() -> new BusinessLogicException(ExceptionCode.OPTION_NOT_FOUND));
    }

    public void deleteCart(Long productId, Long memberId) {
    }
    
    public Cart findVerifiedCart(Long memberId) {
        
        return cartRepository.findByMember_Id(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
