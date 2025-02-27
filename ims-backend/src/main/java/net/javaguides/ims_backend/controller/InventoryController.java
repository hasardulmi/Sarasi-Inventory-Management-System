package net.javaguides.ims_backend.controller;

import net.javaguides.ims_backend.dto.InventoryRegistrationDto;
import net.javaguides.ims_backend.entity.Inventory;
import net.javaguides.ims_backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // Create a new inventory item
    @PostMapping
    public ResponseEntity<Inventory> createInventory(@RequestBody InventoryRegistrationDto registrationDto) {
        Inventory inventory = inventoryService.saveInventory(registrationDto);
        return ResponseEntity.ok(inventory);
    }

    // Get all inventory items
    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventory() {
        List<Inventory> inventoryList = inventoryService.getAllInventory();
        return ResponseEntity.ok(inventoryList);
    }

    // Get an inventory item by ID
    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable Long id) {
        Inventory inventory = inventoryService.getInventoryById(id);
        return ResponseEntity.ok(inventory);
    }

    // Update an inventory item
    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable Long id, @RequestBody InventoryRegistrationDto registrationDto) {
        Inventory updatedInventory = inventoryService.updateInventory(id, registrationDto);
        return ResponseEntity.ok(updatedInventory);
    }

    // Delete an inventory item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
        return ResponseEntity.noContent().build();
    }
}