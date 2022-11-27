package gohome.dailydaily.domain.order.repository;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberStatus;
import gohome.dailydaily.domain.order.entity.Order;
import gohome.dailydaily.domain.order.entity.OrderProduct;
import gohome.dailydaily.domain.product.entity.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.persistence.EntityManager;

import static gohome.dailydaily.util.TestConstant.FILE;

@DataJpaTest
class OrderRepositoryTest {

    @Autowired
    private EntityManager em;

    @Test
    public void saveOrder() {
        Member member = Member.builder()
                .email("test@test.com")
                .nickname("닉네임")
                .password("password123!@#")
                .address("주소")
                .phone("010-1234-5678")
                .memberStatus(MemberStatus.ACTIVE)
                .img(FILE)
                .build();

        Product product1 = Product.builder()
                .title("productTest")
                .content("[test, test]")
                .img(FILE)
                .sale(0)
                .price(10000)
                .score(4)
                .build();

        Product product2 = Product.builder()
                .title("productTest2")
                .content("[test, test]")
                .img(FILE)
                .sale(0)
                .price(10000)
                .score(4)
                .build();

        OrderProduct orderProduct1 = OrderProduct.builder()
                .product(product1)
                .count(5)
                .build();
        OrderProduct orderProduct2 = OrderProduct.builder()
                .product(product2)
                .count(3)
                .build();

        Order order = Order.builder()
                .member(member)
                .build();

        order.addOrderProduct(orderProduct1, orderProduct2);

        em.persist(member);
        em.persist(product1);
        em.persist(product2);

        order.getOrderProducts()
                .forEach(orderProduct -> {
                    orderProduct.addProduct(
                            Product.builder()
                                    .id(product1.getId())
                                    .build());
                    orderProduct.addOrder(
                            order);
                });
        em.persist(order);
//
        em.flush();
        em.clear();

        Order order1 = em.find(Order.class, order.getId());
//        System.out.println(order1.getMember().getEmail());
        order1.getOrderProducts()
                .forEach(orderProduct -> System.out.println(orderProduct.getProduct().getTitle()));
    }
}