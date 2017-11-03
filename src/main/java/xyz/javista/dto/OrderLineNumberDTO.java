package xyz.javista.dto;

import java.util.UUID;

public class OrderLineNumberDTO {

    private UUID id;
    private Double price;
    private Boolean isPaid;
    private UserDTO purchaser;
    private OrderDTO order;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getPaid() {
        return isPaid;
    }

    public void setPaid(Boolean paid) {
        isPaid = paid;
    }

    public UserDTO getPurchaser() {
        return purchaser;
    }

    public void setPurchaser(UserDTO purchaser) {
        this.purchaser = purchaser;
    }

    public OrderDTO getOrder() {
        return order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }
}
