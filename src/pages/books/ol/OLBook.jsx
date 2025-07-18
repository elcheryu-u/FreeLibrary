import { ArrowBack, HelpRounded, SendRounded } from '@mui/icons-material';
import { Backdrop, Box, Button, Chip, Collapse, Container, Divider, Fade, Modal, Stack, Typography } from '@u_ui/u-ui';
import CircularProgress from '@u_ui/u-ui/CircularProgress';
import React from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import openai from '../../../services/openai';

const KnowMore = ({ book }) => {
    const [searchParams] = useSearchParams();
    const [summary, setSummary] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleKnowMore = async () => {
        try {
            setLoading(true);
            setSummary('');

            const title = book.title || 'Título desconocido';
            const authors = book.author_name?.join(', ') || 'Autor desconocido';
            const description = typeof book.description === 'string'
                ? book.description
                : book.description?.value || '';
            const subjects = book.subjects?.slice(0, 3).join(', ');
            const characters = book.subject_people?.slice(0, 3).join(', ');

            const prompt = `
    Resumen breve del libro "${title}" de ${authors}. ${searchParams.get('last-search')}. Máximo 1 párrafo. Temas: ${subjects}. Personajes: ${characters}. ${description.slice(0, 300)}...
            `.trim();

            const response = await openai.responses.create({
                model: 'o4-mini',
                input: prompt
            });

            setSummary(response.output_text)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box>
            <Button onClick={handleKnowMore} loading={loading} loadingPosition='start' variant='contained' endIcon={<HelpRounded />}>
                Know More
            </Button>
            <Collapse in={summary.length > 0}>
                <Typography variant="body1" sx={{ mt: 3}} gutterBottom>
                    {summary}
                </Typography>
                <Button variant='outlined' endIcon={<SendRounded />}>Saber más</Button>
            </Collapse>
        </Box>
    )
}

const BookDescription = ({ book }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 500,
        width: '100%',
        bgcolor: 'background.paper',
        border: '2px solid background',
        boxShadow: 24,
        borderRadius: 1,
        p: 4,
        maxHeight: '80vh',
        overflowY: 'auto'
    };

    return (
        <React.Fragment>
            <Typography onClick={handleOpen} component={Button} variant="body1" textTransform='initial' textAlign='left' sx={{ p: 0 }}>
                {(() => {
                    const desc = typeof book.description === 'string'
                        ? book.description
                        : book.description?.value;

                    if (!desc) return 'No description available.';

                    return desc.length > 300 ? `${desc.slice(0, 200)}...` : desc;
                })()}
            </Typography>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography variant="body1">
                            {(() => {
                                const desc = typeof book.description === 'string'
                                    ? book.description
                                    : book.description?.value;

                                if (!desc) return 'No description available.';

                                return desc;
                            })()}
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </React.Fragment>
    )
}

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
                setError(err);
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
                        style={{ width: 250, borderRadius: 6 }}
                    />
                </Box>

                <Box>
                    <BookDescription book={book} />

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

            <Divider sx={{ marginBlock: 2}} />

            <KnowMore book={book} />
        </Container>
    )
}
