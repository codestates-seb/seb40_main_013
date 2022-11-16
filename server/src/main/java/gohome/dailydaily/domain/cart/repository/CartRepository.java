package gohome.dailydaily.domain.cart.repository;

import gohome.dailydaily.domain.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {

}
