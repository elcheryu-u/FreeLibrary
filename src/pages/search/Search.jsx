import { Card, CardContent, CardMedia, Chip, Container, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Stack, styled, Typography } from '@u_ui/u-ui';
import CircularProgress from '@u_ui/u-ui/CircularProgress';
import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { BookmarkAddOutlined, Search as SearchIcon } from '@mui/icons-material';
import saveBook from '../../utils/saveBook';
import { AuthContext } from '../../context/AuthContext';

const InputWrapper = styled('form')(( {theme }) => ({
    padding: theme.spacing(1.5),
    borderRadius: 2,
    outlineColor: 'transparent',
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    paddingBlock: theme.spacing(1),
    marginBlock: theme.spacing(2)
}))

const Input = styled('input')(( {theme }) => ({
    padding: theme.spacing(1),
    fontSize: '1.5rem',
    flex: 1,
    border: 0,
    outline: 'none'
}))

const ResultList = styled('ul')(({ theme }) => ({
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    listStyle: 'none',
    padding: 0
}));

const BookCard = ({ book, search }) => {
    const { user } = React.useContext(AuthContext);
    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (e) => {
        e.preventDefault();

        if (!user) return;

        setContextMenu(
            contextMenu === null
              ? {
                  mouseX: e.clientX + 2,
                  mouseY: e.clientY - 6,
                }
              : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                // Other native context menus might behave different.
                // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
          );
    }

    const handleClose = () => {
        setContextMenu(null);
    }

    const handleSaveBook = async () => {
        try {
            await saveBook(book, user, search)
            handleClose();
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <React.Fragment>
            <Card 
                onContextMenu={handleContextMenu}
                component={Link}
                to={`/book/ol/${book.key?.replace('/works/', '')}?last-search=${encodeURIComponent(search)}`}
                sx={{
                    width: '100%',
                    textDecoration: 'none',
                    borderRadius: 1,
                    overflow: 'hidden',
                    boxShadow: 3,
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                        transform: 'scale(1.01)',
                        boxShadow: 6,
                    },
                }}
            >
                <CardMedia
                    component="img"
                    height="280"
                    image={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ padding: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
                        {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {book.author_name?.join(', ') || 'Unknown'}
                    </Typography>

                    {book.language && (
                        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                            {book.language.slice(0, 3).map((lang, i) => (
                                <Chip key={i} label={lang} size="small" />
                            ))}
                        </Stack>
                    )}
                </CardContent>
            </Card>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
                }
            >
                <MenuItem onClick={handleSaveBook}>
                    <ListItemIcon sx={{ minWidth: 40}}>
                        <BookmarkAddOutlined />
                    </ListItemIcon> 
                    <ListItemText>Save book</ListItemText>
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get('query') || '';
    
    const [input, setInput] = useState(initialQuery);
    const [books, setBooks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (input.trim()) {
                setSearchParams({ query: input.trim() });
            }
        }, 700);

        return () => clearTimeout(delayDebounce);
    }, [input, setSearchParams]);

    React.useEffect(() => {
        const query = searchParams.get('query');
        if (!query) {
            setLoading(false);
            setError('');
            return;
        }

        async function fetchBooks() {
            setLoading(true);
            setError(null);
            
            try {
                const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error("Failed to fetch data");
                
                const data = await response.json();
                setBooks(data.docs);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, [searchParams])

    return (
        <Container>
            <InputWrapper
                onSubmit={(e) => {
                    e.preventDefault();
                    setSearchParams({ query: input.trim() });
                }}
            >
                <Input 
                    placeholder="Search books..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)} 
                />
                <IconButton type='submit'>
                    <SearchIcon />
                </IconButton>
            </InputWrapper>

            {searchParams.get('query') && 
                <Typography variant='h4' gutterBottom>
                    Results for "{searchParams.get('query')}"
                </Typography>
            }


            {loading && <CircularProgress />}
            {error && <Typography color='error'>Error: {error}</Typography>}

            {!loading && !error && books.length === 0 && (
                <Typography>No results found.</Typography>
            )}

            {!loading && !error && books.length > 0 && (
                <ResultList>
                    {books.map((book) => {
                        if (!book.cover_i) return;

                        return <BookCard key={book.key} book={book} search={searchParams.get('query')} />
                    })}
                </ResultList>
            )}
        </Container>
    )
}
