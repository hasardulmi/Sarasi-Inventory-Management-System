import React from 'react';
import { Typography, Box } from '@mui/material';

const OwnerDashboard = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1">
                Owner Dashboard
            </Typography>
            <Typography variant="body1">
                Welcome to the Owner Dashboard!
            </Typography>
        </Box>
    );
};

export default OwnerDashboard;