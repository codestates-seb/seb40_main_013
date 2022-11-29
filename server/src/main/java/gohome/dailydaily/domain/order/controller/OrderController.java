package gohome.dailydaily.domain.order.controller;

import gohome.dailydaily.domain.order.dto.OrderDto;
import gohome.dailydaily.domain.order.entity.Order;
import gohome.dailydaily.domain.order.mapper.OrderMapper;
import gohome.dailydaily.domain.order.service.OrderService;
import gohome.dailydaily.global.common.dto.PageResponseDto;
import gohome.dailydaily.global.common.security.resolver.MemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@Validated
public class OrderController {
    private final OrderService orderService;
    private final OrderMapper mapper;

    @PostMapping
    @CacheEvict(key = "#memberId", value = "getOrders")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDto.Response postOrder(@MemberId Long memberId,
                                       @Valid @RequestBody OrderDto.Post post) {

        Order saveOrder = orderService.createOrder(mapper.toOrder(post, memberId));

        return mapper.toResponse(saveOrder);
    }

    @GetMapping
    @Cacheable(key = "#memberId + \":\" + #pageable.pageNumber  + \":\" +  #pageable.pageSize + \":\" + #pageable.sort", value = "getOrders")
    public PageResponseDto<OrderDto.Response> getOrders(@MemberId Long memberId,
                                                        @PageableDefault(size = 20, sort = "createdAt",
                                                                direction = Sort.Direction.DESC) Pageable pageable) {

        Page<Order> orders = orderService.findByMember_Id(memberId, pageable);

        return PageResponseDto.of(orders.map(mapper::toResponse));
    }

    @DeleteMapping("/{order-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @CacheEvict(key = "#memberId", value = "getOrders")
    public String cancelOrder(@MemberId Long memberId,
                              @PathVariable("order-id") Long orderId) {
        orderService.cancelOrder(memberId, orderId);
        return "Cancel order";
    }
}
