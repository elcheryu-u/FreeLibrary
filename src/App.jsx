import { createTheme, CssBaseline, ThemeProvider } from '@u_ui/u-ui';
import React from 'react'
import { AuthProvider } from './context/AuthContext';
import Layout from './pages/Layout';

export default function App() {
    const theme = createTheme({
        palette: {
            mode: 'light'
        }
    });

    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout />
            </ThemeProvider>
        </AuthProvider>
    )
}
