import { Search } from '@mui/icons-material';
import { Box, Button, Container, Paper, styled, Typography } from '@u_ui/u-ui'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const InputWrapper = styled('form')(({ theme }) => ({
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    fontSize: '1.75rem',
    background: theme.palette.background.paper,
    display: 'flex',
    width: '100%',
    transition: '.2s ease all',
    outline: '3px solid transparent',
    borderRadius: 2,
    ':focus-within': {
        borderColor: '#000',
        outlineColor: '#FFF'
    }
}))

const Input = styled('input')(({ theme }) => ({
    padding: theme.spacing(1.5),
    outline: 'none',
    fontSize: '1.75rem',
    background: 'transparent',
    border: 'none',
    flex: 1,
}))

const SearchInput = ({ setBooks }) => {
    const [value, setValue] = React.useState('');
    const disabled = !Boolean(value.trim().length > 0);

    const navigate = useNavigate();

    const handlSearch = () => {
        if (value.trim().length > 0) {
            navigate(`/search?query=${encodeURIComponent(value.trim())}`);
        }
    };

    return (
        <Container 
            sx={{
                display: 'flex',
                gap: 1,
                position: 'relative',
                marginTop: 3,
                marginBottom: 5
            }}
            maxWidth="lg"
        >
            <InputWrapper
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!disabled) {
                        handlSearch();
                    }
                }}
            >
                <Input 
                    name="search" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    placeholder='Search books by title or author...' 
                />
                <Button 
                    disabled={disabled} 
                    variant='contained'
                    type='submit'
                >
                    <Search />
                    Search
                </Button>
            </InputWrapper>
        </Container>
    )
}

export default function Hero() {
    const [books, setBooks] = React.useState([]);

    return (
        <Box
            sx={{
                p: 3,
                background: 'linear-gradient(135deg,rgba(107, 92, 255, 1) 0%,rgba(234, 162, 252, 1) 100%)',
                minHeight: '60dvh',
                pb: 10
            }}
        >
            <SearchInput setBooks={setBooks} />
            <Container 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    alignItems: 'flex-start'
                }}
                maxWidth="lg"
            >
                <Box
                    sx={{
                        maxWidth: 700
                    }}
                >
                    <Typography
                        variant='h2'
                        component='h1'
                        sx={{
                            fontWeight: 700,
                            color: '#FFF'
                        }}
                    >
                        Biblioteca Digital <br />
                        Comunitaria
                    </Typography>
                    <Typography color='#FFF' component='p' variant='h5'>
                        Conecta, comparte y descubre libros con una comunidad global. Gestiona tu biblioteca personal, presta libros y recibe sugerencias personalizadas con IA.
                    </Typography>
                    <Button LinkComponent={Link} to="/auth/login" sx={{ mt: 3}} variant='contained' color='neutral' size="large">
                        Crear Cuenta
                    </Button>
                </Box>
            </Container>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}
            >
            </Container>
        </Box>
    )
}
