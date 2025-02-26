import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', formData);
            if (response.status === 200) {
                navigate('/dashboard'); // Navigate to the dashboard on successful login
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            console.error(error);
            setError('There is an error!.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh'
                }}
            >
                <Paper elevation={6} sx={{ borderRadius: 4, overflow: 'hidden', padding: 4 }}>
                    <Grid container spacing={2} direction="column" alignItems="center">
                        <Grid item>
                            <LockIcon sx={{ fontSize: 80 }} />
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" component="h1">
                                Login
                            </Typography>
                        </Grid>
                        <Grid item>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {error && (
                                    <Typography color="error" sx={{ mt: 2 }}>
                                        {error}
                                    </Typography>
                                )}
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{ mt: 3 }}
                                >
                                    Login
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;