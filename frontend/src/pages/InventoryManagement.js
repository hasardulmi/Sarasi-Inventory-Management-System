import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import OwnerNavbar from '../components/OwnerNavbar';

const InventoryManagement = () => {
    const [inventory, setInventory] = useState([]); // State to store inventory data
    const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
    const [currentInventory, setCurrentInventory] = useState({
        id: null,
        inventoryName: '',
        inventoryDescription: '',
        inventoryCategory: '',
        inventoryUnitPrice: '',
        inventoryQuantity: '',
        supplierName: '',
    });
    const [isEditMode, setIsEditMode] = useState(false); // State to track if we're editing or adding

    // Fetch inventory data when the component mounts
    useEffect(() => {
        fetchInventory();
    }, []);

    // Function to fetch inventory data from the backend
    const fetchInventory = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/inventory');
            setInventory(response.data); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    // Handle input change for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentInventory({ ...currentInventory, [name]: value });
    };

    // Open dialog for adding or editing inventory
    const handleOpenDialog = (inventoryItem = null) => {
        if (inventoryItem) {
            // If editing, populate the form with the current inventory item
            setCurrentInventory(inventoryItem);
            setIsEditMode(true);
        } else {
            // If adding, reset the form
            setCurrentInventory({
                id: null,
                inventoryName: '',
                inventoryDescription: '',
                inventoryCategory: '',
                inventoryUnitPrice: '',
                inventoryQuantity: '',
                supplierName: '',
            });
            setIsEditMode(false);
        }
        setOpenDialog(true); // Open the dialog
    };

    // Close dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Save or update inventory
    const handleSaveInventory = async () => {
        try {
            if (isEditMode) {
                // Update existing inventory item
                await axios.put(`http://localhost:8080/api/inventory/${currentInventory.id}`, currentInventory);
            } else {
                // Add new inventory item
                await axios.post('http://localhost:8080/api/inventory', currentInventory);
            }
            fetchInventory(); // Refresh the inventory list
            handleCloseDialog(); // Close the dialog
        } catch (error) {
            console.error('Error saving inventory:', error);
        }
    };

    // Delete inventory
    const handleDeleteInventory = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/inventory/${id}`);
            fetchInventory(); // Refresh the inventory list
        } catch (error) {
            console.error('Error deleting inventory:', error);
        }
    };

    return (
        <>
            <OwnerNavbar />
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Inventory Management
                </Typography>

                {/* Add Inventory Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog()}
                    sx={{ mb: 3 }}
                >
                    Add New Inventory
                </Button>

                {/* Inventory Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Supplier</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inventory.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.inventoryName}</TableCell>
                                    <TableCell>{item.inventoryDescription}</TableCell>
                                    <TableCell>{item.inventoryCategory}</TableCell>
                                    <TableCell>{item.inventoryUnitPrice}</TableCell>
                                    <TableCell>{item.inventoryQuantity}</TableCell>
                                    <TableCell>{item.supplierName}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleOpenDialog(item)}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDeleteInventory(item.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Add/Edit Inventory Dialog */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{isEditMode ? 'Edit Inventory' : 'Add New Inventory'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Inventory Name"
                            name="inventoryName"
                            value={currentInventory.inventoryName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Description"
                            name="inventoryDescription"
                            value={currentInventory.inventoryDescription}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Category"
                            name="inventoryCategory"
                            value={currentInventory.inventoryCategory}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Unit Price"
                            name="inventoryUnitPrice"
                            value={currentInventory.inventoryUnitPrice}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Quantity"
                            name="inventoryQuantity"
                            value={currentInventory.inventoryQuantity}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Supplier Name"
                            name="supplierName"
                            value={currentInventory.supplierName}
                            onChange={handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleSaveInventory} color="primary">
                            {isEditMode ? 'Update' : 'Save'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
};

export default InventoryManagement;