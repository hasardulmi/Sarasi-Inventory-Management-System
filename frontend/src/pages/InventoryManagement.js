import React from 'react';
import { Typography, Box } from '@mui/material';
import OwnerNavbar from '../components/OwnerNavbar';

const  InventoryManagement = () => {
    return (
        <>
            <OwnerNavbar />
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" component="h1">
                   Inventory Management
                </Typography>
                <Typography variant="body1">
                    This is the Inventory Management page.
                </Typography>
            </Box>
        </>
    );
};

export default  InventoryManagement;