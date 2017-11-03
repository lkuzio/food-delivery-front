package xyz.javista.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import xyz.javista.core.domain.Order;

import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {

}
