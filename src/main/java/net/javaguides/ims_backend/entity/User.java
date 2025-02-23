package net.javaguides.ims_backend.entity;

import jakarta.persistence.*;
import lombok.*;



@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;
    private String phone;
    private String address;
    private String firstName;
    private String lastName;


    @Enumerated(EnumType.STRING)
    private UserType userType;


}

