package xyz.javista;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import xyz.javista.core.domain.Order;

@SpringBootApplication
public class FoodDelivery {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(FoodDelivery.class, args);
    }

}
