package gohome.dailydaily.domain.order.mapper;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.order.dto.OrderDto;
import gohome.dailydaily.domain.order.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = OrderProductMapper.class, imports = Member.class)
public interface OrderMapper {


    @Mapping(target = "member", expression = "java(Member.builder().id(memberId).build())")
    Order toOrder(OrderDto.Post post, Long memberId);

    @Mapping(target = "orderId", source = "id")
    OrderDto.Response toResponse(Order order);
}
