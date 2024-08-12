"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  CssBaseline,
  Link,
  Grid,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#66a6ff',
    },
    secondary: {
      main: '#89f7fe',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
  },
});

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      toast.error("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    toast.info("Welcome! Please Login !");
  }, []);


  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
          padding: '2rem',
        }}
      >
        <Container maxWidth="xs">
          <Paper
            elevation={12}
            sx={{
              padding: '3rem',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backdropFilter: 'blur(10px)',
              backgroundColor: alpha('#fff', 0.8),
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
              Welcome Back
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                label="Remember me"
                sx={{ mb: 2 }}
              />
              {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(to right, #66a6ff, #89f7fe)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #5a95e5, #7de0e5)',
                  },
                }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Link href="#" variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
    </ThemeProvider>
  );
};

export default Login;
