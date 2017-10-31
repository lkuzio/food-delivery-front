package xyz.javista.core.domain;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private String email;
    private String login;
    private String password;
    @ManyToMany
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private List<Role> roles;
    @OneToMany(mappedBy = "author")
    private List<Order> createdOrders;
    @OneToMany(mappedBy = "purchaser")
    private List<OrderLineNumber> purchasedProducts;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public List<Order> getCreatedOrders() {
        return createdOrders;
    }

    public void setCreatedOrders(List<Order> createdOrders) {
        this.createdOrders = createdOrders;
    }

    public List<OrderLineNumber> getPurchasedProducts() {
        return purchasedProducts;
    }

    public void setPurchasedProducts(List<OrderLineNumber> purchasedProducts) {
        this.purchasedProducts = purchasedProducts;
    }
}
