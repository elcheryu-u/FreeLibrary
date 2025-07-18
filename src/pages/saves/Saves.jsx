import { Box, Card, CardContent, CardMedia, Chip, Container, Menu, MenuItem, Stack, Typography } from '@u_ui/u-ui'
import CircularProgress from '@u_ui/u-ui/CircularProgress';
import React from 'react'
import { AuthContext } from '../../context/AuthContext';
import { firestore } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link, Navigate } from 'react-router-dom';
import { BookmarkAddOutlined } from '@mui/icons-material';

const BookCard = ({ book }) => {
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
            await saveBook(book, user)
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
                to={`/book/ol/${book.key?.replace('/works/', '')}?last-search=${encodeURIComponent(book.free_library_search)}`}
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
                <MenuItem onClick={handleSaveBook}><BookmarkAddOutlined /> Save book</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

const BookList = ({books}) => {
    console.log(books)
    return (
        <Box
            sx={{
                display: 'grid',
                gap: 4,
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
            }}
        >
            {books.map((book, i) => (
                <BookCard key={i} book={book}/>
            ))}
        </Box>
    )
}

export default function Saves() {
    const { user } = React.useContext(AuthContext);
    const [books, setBooks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);  

    React.useEffect(() => {
        if (!user) return;
    
        async function loadBooks() {
            try {
                const docRef = doc(firestore, `collections/${user.uid}`);
                const dataSnap = await getDoc(docRef);
    
                if (dataSnap.exists()) {
                    setBooks(dataSnap.data().books);
                } else {
                    throw new Error("No books");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadBooks();
    
    }, [user]);

    if (user === null) {
        return <Navigate to="/" />
    }

    return (
        <Container>
            <Typography gutterBottom component='h1' variant='h3'>SAVED BOOKS</Typography>

            {loading && <CircularProgress />}


            {!loading && (!books || books.length < 1) && <Typography>You have not saved any books.</Typography>}



            {!loading && books.length > 1 &&
                <BookList books={books} />
            }
        </Container>
    )
}
