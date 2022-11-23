package gohome.dailydaily.domain.order.controller;

import gohome.dailydaily.domain.order.dto.OrderDto;
import gohome.dailydaily.domain.order.entity.Order;
import gohome.dailydaily.domain.order.mapper.OrderMapper;
import gohome.dailydaily.domain.order.service.OrderService;
import gohome.dailydaily.global.common.security.resolver.MemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final OrderMapper mapper;

    @PostMapping
    public ResponseEntity postOrder(@MemberId Long memberId,
                                    @RequestBody OrderDto.Post post) {
        Order order = mapper.toOrder(post);

        return new ResponseEntity<>(mapper.toResponse(order), HttpStatus.CREATED);
    }
}
