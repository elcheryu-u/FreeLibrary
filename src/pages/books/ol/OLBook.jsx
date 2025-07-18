import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Chip, Container, Divider, Stack, Typography } from '@u_ui/u-ui';
import CircularProgress from '@u_ui/u-ui/CircularProgress';
import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function OLBook() {
    const { id } = useParams();
    const [book, setBook] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`https://openlibrary.org/works/${id}.json`);
                if (!response.ok) throw new Error("Error fetching book details.");
                const data = await response.json();
                setBook(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) return <CircularProgress sx={{ m: 4 }} />;
    if (error) return <Typography color='error'>Error: {error}</Typography>;
    if (!book) return <Typography>No book data.</Typography>;

    console.log(book)

    const coverId = book.covers?.[0];
    const imageUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : 'https://placehold.co/300x450?text=No+Cover&font=roboto'; 

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center'}}>
                <Button to="/search" variant='outlined' LinkComponent={Link}>
                    <ArrowBack /> Back to search
                </Button>
                <Typography textTransform="uppercase" variant='h5' component='h1' sx={{ flex: 1, textAlign: 'right'}}>{book.title}</Typography>
            </Box>

            <Divider sx={{ marginBlock: 2}} />

            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
                <Box flexShrink={0}>
                    <img 
                        src={imageUrl}
                        alt={book.title}
                        style={{ width: 250, borderRadius: 12 }}
                    />
                </Box>

                <Box>
                    {book.description && (
                        <Typography variant='body1' sx={{ mb: 2}}>
                            {typeof book.description === 'string'
                                ? book.description
                                : book.description?.value}
                        </Typography>
                    )}

                    {book.subjects?.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Subjects:
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {book.subjects.slice(0, 10).map((subject, index) => (
                                    <Chip key={index} label={subject} />
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    )
}
