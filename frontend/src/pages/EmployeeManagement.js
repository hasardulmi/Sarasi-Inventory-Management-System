import React from 'react';
import { Typography, Box } from '@mui/material';
import OwnerNavbar from '../components/OwnerNavbar';

const   EmployeeManagement = () => {
    return (
        <>
            <OwnerNavbar />
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" component="h1">
                    Employee Management
                </Typography>
                <Typography variant="body1">
                    This is the employee management page.
                </Typography>
            </Box>
        </>
    );
};

export default  EmployeeManagement;