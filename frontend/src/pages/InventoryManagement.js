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
    Snackbar,
    Alert,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import OwnerNavbar from '../components/OwnerNavbar';

const InventoryManagement = () => {
    const [inventory, setInventory] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentInventory, setCurrentInventory] = useState({
        id: null,
        inventoryName: '',
        inventoryDescription: '',
        inventoryCategory: '',
        inventoryUnitPrice: '',
        inventoryQuantity: '',
        supplierName: '',
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [categories, setCategories] = useState(['Electronics', 'Furniture', 'Clothing']); // Predefined categories
    const [newCategory, setNewCategory] = useState('');
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Fetch inventory data
    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/inventory');
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    // Handle input change for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentInventory({ ...currentInventory, [name]: value });
        // Clear errors when the user types
        setErrors({ ...errors, [name]: '' });
    };

    // Handle category selection or addition
    const handleCategoryChange = (e) => {
        const { value } = e.target;
        if (value === 'add-new') {
            setCurrentInventory({ ...currentInventory, inventoryCategory: '' });
        } else {
            setCurrentInventory({ ...currentInventory, inventoryCategory: value });
        }
    };

    // Handle adding a new category
    const handleAddNewCategory = () => {
        if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setCurrentInventory({ ...currentInventory, inventoryCategory: newCategory });
            setNewCategory('');
        }
    };

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};
        if (!currentInventory.inventoryName.trim()) {
            newErrors.inventoryName = 'Inventory Name is required';
        }
        if (!currentInventory.inventoryDescription.trim()) {
            newErrors.inventoryDescription = 'Description is required';
        }
        if (!currentInventory.inventoryCategory.trim()) {
            newErrors.inventoryCategory = 'Category is required';
        }
        if (!currentInventory.inventoryUnitPrice.trim() || isNaN(currentInventory.inventoryUnitPrice)) {
            newErrors.inventoryUnitPrice = 'Unit Price must be a number';
        }
        if (!currentInventory.inventoryQuantity.trim() || isNaN(currentInventory.inventoryQuantity)) {
            newErrors.inventoryQuantity = 'Quantity must be a number';
        }
        if (!currentInventory.supplierName.trim()) {
            newErrors.supplierName = 'Supplier Name is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Open dialog for adding or editing inventory
    const handleOpenDialog = (inventoryItem = null) => {
        if (inventoryItem) {
            setCurrentInventory(inventoryItem);
            setIsEditMode(true);
        } else {
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
        setOpenDialog(true);
    };

    // Close dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setErrors({});
    };

    // Save or update inventory
    const handleSaveInventory = async () => {
        if (!validateForm()) return;

        try {
            if (isEditMode) {
                await axios.put(`http://localhost:8080/api/inventory/${currentInventory.id}`, currentInventory);
                setSnackbarMessage('Inventory updated successfully');
            } else {
                await axios.post('http://localhost:8080/api/inventory', currentInventory);
                setSnackbarMessage('Inventory added successfully');
            }
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            fetchInventory();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving inventory:', error);
            setSnackbarMessage('Error saving inventory');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    // Delete inventory
    const handleDeleteInventory = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/inventory/${id}`);
            setSnackbarMessage('Inventory deleted successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            fetchInventory();
        } catch (error) {
            console.error('Error deleting inventory:', error);
            setSnackbarMessage('Error deleting inventory');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    // Close snackbar
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
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
                            error={!!errors.inventoryName}
                            helperText={errors.inventoryName}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Description"
                            name="inventoryDescription"
                            value={currentInventory.inventoryDescription}
                            onChange={handleInputChange}
                            error={!!errors.inventoryDescription}
                            helperText={errors.inventoryDescription}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={currentInventory.inventoryCategory || ''}
                                onChange={handleCategoryChange}
                                label="Category"
                                error={!!errors.inventoryCategory}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                                <MenuItem value="add-new">Add New Category</MenuItem>
                            </Select>
                            {currentInventory.inventoryCategory === '' && (
                                <Box sx={{ mt: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="New Category"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                    />
                                    <Button onClick={handleAddNewCategory} sx={{ mt: 1 }}>
                                        Add
                                    </Button>
                                </Box>
                            )}
                            {errors.inventoryCategory && (
                                <Typography color="error" variant="body2">
                                    {errors.inventoryCategory}
                                </Typography>
                            )}
                        </FormControl>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Unit Price"
                            name="inventoryUnitPrice"
                            value={currentInventory.inventoryUnitPrice}
                            onChange={handleInputChange}
                            error={!!errors.inventoryUnitPrice}
                            helperText={errors.inventoryUnitPrice}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Quantity"
                            name="inventoryQuantity"
                            value={currentInventory.inventoryQuantity}
                            onChange={handleInputChange}
                            error={!!errors.inventoryQuantity}
                            helperText={errors.inventoryQuantity}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Supplier Name"
                            name="supplierName"
                            value={currentInventory.supplierName}
                            onChange={handleInputChange}
                            error={!!errors.supplierName}
                            helperText={errors.supplierName}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleSaveInventory} color="primary">
                            {isEditMode ? 'Update' : 'Save'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar for Notifications */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
};

export default InventoryManagement;