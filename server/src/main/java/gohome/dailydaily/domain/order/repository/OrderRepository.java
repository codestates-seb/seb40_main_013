package gohome.dailydaily.domain.order.repository;

import gohome.dailydaily.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
