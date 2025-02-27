package net.javaguides.ims_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String inventoryName;
    private String inventoryDescription;
    private String inventoryCategory;
    private String inventoryUnitPrice;
    private String inventoryQuantity;
    private String supplierName;
}