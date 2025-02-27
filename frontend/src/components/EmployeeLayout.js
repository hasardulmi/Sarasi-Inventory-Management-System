import React from 'react';
import EmployeeNavbar from './EmployeeNavbar';
import { Box } from '@mui/material';

const EmployeeLayout = ({ children }) => {
    return (
        <>
            {/* Include the OwnerNavbar at the top */}
            <EmployeeNavbar />

            {/* Add padding or margin to ensure content is not hidden behind the navbar */}
            <Box sx={{ mt: 8, p: 3 }}>
                {children}
            </Box>
        </>
    );
};

export default EmployeeLayout;