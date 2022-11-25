package gohome.dailydaily.domain.order.controller;

import gohome.dailydaily.domain.order.dto.OrderDto;
import gohome.dailydaily.domain.order.entity.Order;
import gohome.dailydaily.domain.order.mapper.OrderMapper;
import gohome.dailydaily.domain.order.mapper.OrderProductMapper;
import gohome.dailydaily.domain.order.service.OrderService;
import gohome.dailydaily.global.common.dto.PageResponseDto;
import gohome.dailydaily.global.common.security.resolver.MemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final OrderMapper mapper;

    @PostMapping
    public ResponseEntity postOrder(@MemberId Long memberId,
                                    @RequestBody OrderDto.Post post) {

        Order saveOrder = orderService.createOrder(mapper.toOrder(post, memberId));

        return new ResponseEntity<>(mapper.toResponse(saveOrder), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity getOrders(@MemberId Long memberId,
                                    @PageableDefault(size = 20, sort = "createdAt",
                                            direction = Sort.Direction.DESC) Pageable pageable) {

        Page<Order> orders = orderService.findByMember_Id(memberId, pageable);

        return new ResponseEntity<>(PageResponseDto.of(orders.map(mapper::toResponse)), HttpStatus.OK);
    }

    @DeleteMapping("/{order-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public String cancelOrder(@MemberId Long memberId,
                                      @PathVariable("order-id") Long orderId) {
        orderService.cancelOrder(memberId, orderId);
        return "Cancel order";
    }
}
