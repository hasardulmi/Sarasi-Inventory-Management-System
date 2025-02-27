package net.javaguides.ims_backend.service;

import net.javaguides.ims_backend.dto.InventoryRegistrationDto;
import net.javaguides.ims_backend.entity.Inventory;
import net.javaguides.ims_backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    // Save a new inventory item
    public Inventory saveInventory(InventoryRegistrationDto registrationDto) {
        Inventory inventory = new Inventory();
        inventory.setInventoryName(registrationDto.getInventoryName());
        inventory.setInventoryDescription(registrationDto.getInventoryDescription());
        inventory.setInventoryCategory(registrationDto.getInventoryCategory());
        inventory.setInventoryUnitPrice(registrationDto.getInventoryUnitPrice());
        inventory.setInventoryQuantity(registrationDto.getInventoryQuantity());
        inventory.setSupplierName(registrationDto.getSupplierName());
        return inventoryRepository.save(inventory);
    }

    // Get all inventory items
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    // Get an inventory item by ID
    public Inventory getInventoryById(Long id) {
        return inventoryRepository.findById(id).orElse(null);
    }

    // Update an inventory item
    public Inventory updateInventory(Long id, InventoryRegistrationDto registrationDto) {
        Inventory existingInventory = inventoryRepository.findById(id).orElse(null);
        if (existingInventory != null) {
            existingInventory.setInventoryName(registrationDto.getInventoryName());
            existingInventory.setInventoryDescription(registrationDto.getInventoryDescription());
            existingInventory.setInventoryCategory(registrationDto.getInventoryCategory());
            existingInventory.setInventoryUnitPrice(registrationDto.getInventoryUnitPrice());
            existingInventory.setInventoryQuantity(registrationDto.getInventoryQuantity());
            existingInventory.setSupplierName(registrationDto.getSupplierName());
            return inventoryRepository.save(existingInventory);
        }
        return null;
    }

    // Delete an inventory item
    public void deleteInventory(Long id) {
        inventoryRepository.deleteById(id);
    }
}