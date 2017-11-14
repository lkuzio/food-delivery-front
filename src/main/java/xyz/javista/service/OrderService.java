package xyz.javista.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import xyz.javista.command.CreateOrderCommand;
import xyz.javista.core.domain.Order;
import xyz.javista.core.specification.OrderSpecification;
import xyz.javista.dto.OrderDTO;
import xyz.javista.mapper.OrderMapper;
import xyz.javista.core.query.GetOrderListQuery;
import xyz.javista.core.repository.OrderRepository;

@Service
public class OrderService {


    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderMapper orderMapper;

    public Page<OrderDTO> getOrders(GetOrderListQuery query) {
        OrderSpecification specification = new OrderSpecification(query);
        Page<Order> result = orderRepository.findAll(specification,query);
        return result.map(x -> orderMapper.toDto(x));
    }

    public OrderDTO createOrder(CreateOrderCommand createOrderCommand) {
        Order entity = orderMapper.toEntity(createOrderCommand);
        return orderMapper.toDto(orderRepository.saveAndFlush(entity));
    }
}
