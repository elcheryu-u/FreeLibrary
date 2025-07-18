import { LockOpenRounded, Search, TravelExploreRounded } from '@mui/icons-material';
import { Box, Button, Container, styled, Typography } from '@u_ui/u-ui'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const InputWrapper = styled('form')(({ theme }) => ({
    padding: theme.spacing(0),
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(1),
        flexDirection: 'row'
    },
    border: `1px solid ${theme.palette.divider}`,
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
    fontSize: '1.25rem',
    background: 'transparent',
    border: 'none',
    flex: 1,
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.75rem',
    }
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
    const { user } = React.useContext(AuthContext)
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
                        sx={(theme) => ({
                            fontWeight: 700,
                            color: '#FFF',
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '2.5rem'
                            }
                        })}
                    >
                        Community Digital <br />
                        Library
                    </Typography>
                    <Typography color='#FFF' component='p' variant='h5'>
                    Connect, share, and discover books with a global community. Manage your personal library.
                    </Typography>
                    {user ?
                        <Button endIcon={<TravelExploreRounded />} LinkComponent={Link} to="/search" sx={{ mt: 3}} variant='contained' color='neutral' size="large">
                            Browse books
                        </Button>
                    :
                        <Button endIcon={<LockOpenRounded />} LinkComponent={Link} to="/auth/register" sx={{ mt: 3}} variant='contained' color='neutral' size="large">
                            Create Account
                        </Button>
                    }
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
