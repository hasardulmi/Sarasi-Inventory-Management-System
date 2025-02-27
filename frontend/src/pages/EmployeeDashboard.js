import React from 'react';
import { Typography, Box } from '@mui/material';

const EmployeeDashboard = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1">
                Employee Dashboard
            </Typography>
            <Typography variant="body1">
                Welcome to the Employee Dashboard!
            </Typography>
        </Box>
    );
};

export default EmployeeDashboard;