import { Box, Button, Paper, Typography } from '@u_ui/u-ui'
import React from 'react'
import OpenAI from 'openai';


const SearchInput = ({ setBooks }) => {
    const [value, setValue] = React.useState('');

    async function fetchBooks() {
        const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(value)}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch data");
            
            const data = await response.json();

            setBooks(data.docs);
        } catch (error) {
            resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }

    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Busca otro...' />
            {value}
            <Button onClick={fetchBooks} disabled={value < 1} variant='contained'>Buscar</Button>
        </div>
    )
}

export default function Hero() {
    const [books, setBooks] = React.useState([]);

    return (
        <div>
            <Typography>
                Biblioteca Digital
                Comunitaria
            </Typography>
            <Typography>
                Conecta, comparte y descubre libros con una comunidad global. Gestiona tu biblioteca personal, presta libros y recibe sugerencias personalizadas con IA.
            </Typography>
            <Box>
                <SearchInput setBooks={setBooks} />
            </Box>
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    flexFlow: 'row wrap',
                    gap: theme.spacing(4)
                })}
            >
                {books.map((book) => {
                    if (!book.cover_i) return;

                    return (
                        <Paper 
                            key={book.key}
                            elevation={4}
                            sx={(theme) => ({
                                padding: '1rem',
                                position: 'relative'
                            })}
                        >
                            <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} />
                            <p>{book.title}</p>
                        </Paper>
                    )
                })}
            </Box>
        </div>
    )
}
