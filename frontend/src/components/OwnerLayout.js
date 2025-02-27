import React from 'react';
import OwnerNavbar from './OwnerNavbar';
import { Box } from '@mui/material';

const OwnerLayout = ({ children }) => {
    return (
        <>
            {/* Include the OwnerNavbar at the top */}
            <OwnerNavbar />

            {/* Add padding or margin to ensure content is not hidden behind the navbar */}
            <Box sx={{ mt: 8, p: 3 }}>
                {children}
            </Box>
        </>
    );
};

export default OwnerLayout;