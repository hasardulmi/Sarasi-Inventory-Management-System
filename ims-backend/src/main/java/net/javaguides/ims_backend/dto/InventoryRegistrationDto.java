package net.javaguides.ims_backend.dto;

public class InventoryRegistrationDto {
    private String inventoryName;
    private String inventoryDescription;
    private String inventoryCategory;
    private String inventoryUnitPrice;
    private String inventoryQuantity;
    private String supplierName;

    // Getters and Setters
    public String getInventoryName() {
        return inventoryName;
    }

    public void setInventoryName(String inventoryName) {
        this.inventoryName = inventoryName;
    }

    public String getInventoryDescription() {
        return inventoryDescription;
    }

    public void setInventoryDescription(String inventoryDescription) {
        this.inventoryDescription = inventoryDescription;
    }

    public String getInventoryCategory() {
        return inventoryCategory;
    }

    public void setInventoryCategory(String inventoryCategory) {
        this.inventoryCategory = inventoryCategory;
    }

    public String getInventoryUnitPrice() {
        return inventoryUnitPrice;
    }

    public void setInventoryUnitPrice(String inventoryUnitPrice) {
        this.inventoryUnitPrice = inventoryUnitPrice;
    }

    public String getInventoryQuantity() {
        return inventoryQuantity;
    }

    public void setInventoryQuantity(String inventoryQuantity) {
        this.inventoryQuantity = inventoryQuantity;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }
}