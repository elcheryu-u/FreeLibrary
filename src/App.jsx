import React from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@u_ui/u-ui';
import { AuthProvider } from './context/AuthContext';
import Layout from './pages/Layout';

export default function App() {
    const theme = createTheme({
        palette: {
            mode: 'light',
            background: {
                default: '#f5f5fd',
            },
            primary: {
                main: '#6B5CFF'
            }
        },
        components: {
            uiButton: {
                styleOverrides: {
                    root: ({ theme, ownerState}) => ({
                        borderRadius: 2,
                        ...((ownerState.variant === 'contained' && ownerState.color === 'neutral') && {
                            background: '#FFF',
                            color: '#000',
                            ':hover': {
                                background: '#eee'
                            }
                        })
                    })
                }
            },
            uiAppBar: {
                styleOverrides: {
                    root: {
                        background: '#FFF',
                        color: '#000'
                    }
                }
            }
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
