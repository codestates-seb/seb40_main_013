package gohome.dailydaily.domain.order.repository;

import gohome.dailydaily.domain.order.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @EntityGraph(attributePaths = {"orderProducts", "orderProducts.product", "orderProducts.option", "orderProducts.product.seller.member"})
    Page<Order> findOrderByMember_Id(Long memberId, Pageable pageable);
}
