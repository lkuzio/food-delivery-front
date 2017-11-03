package xyz.javista.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import xyz.javista.command.CreateOrderCommand;
import xyz.javista.dto.OrderDTO;
import xyz.javista.query.GetOrderListQuery;
import xyz.javista.service.OrderService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {

    @Autowired
    OrderService orderService;


    @RequestMapping(method = RequestMethod.GET)
    public Page<OrderDTO> getOrders(@RequestParam(name = "size", defaultValue = "10", required = false) int size,
                                    @RequestParam(name = "limit", defaultValue = "0", required = false) int limit) {
        GetOrderListQuery query = new GetOrderListQuery(size, limit);
        return orderService.getOrders(query);
    }

    @RequestMapping(method = RequestMethod.POST)
    public OrderDTO createOrder(@RequestBody @Valid CreateOrderCommand createOrderCommand){
        return orderService.createOrder(createOrderCommand);
    }



}
