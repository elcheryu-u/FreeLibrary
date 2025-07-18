import { Box, Button, Container, styled, Typography } from '@u_ui/u-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import randomImage from '../../utils/randomImage';

const Input = styled('input')(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: '1rem'
}));

const InputWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  marginBottom: theme.spacing(1)
}));

export default function Register() {
  const { register } = React.useContext(AuthContext);

  const [loading, setLoading] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let url;

      const randomImageUrl = await randomImage();

      if (randomImageUrl) {
        url = randomImageUrl;
      } else {
        url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT59u6mRVrOV-UTnDkCibUbnm7NY3Ke7GZTYw&s'
      }

      await register(email, password, username, url)
    } catch (err) {
      console.error(err);
    }
  }



  return (
    <Container maxWidth="sm" sx={{ pt: 10}}>
        <Typography gutterBottom variant='h2' textTransform="uppercase" component="h1">Register</Typography>
        
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
          component='form'
          onSubmit={handleRegister}
        >
          <InputWrapper>
            <label for="name">Name</label>
            <Input placeholder='Write your email' id="name" type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
          </InputWrapper>
          <InputWrapper>
            <label for="email">Email</label>
            <Input placeholder='Write your email' id="email" type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </InputWrapper>
          <InputWrapper>
            <label for="password">Password</label>
            <Input placeholder='Write your password' id="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </InputWrapper>
          <Button loading={loading} disabled={!(email.length > 6 && password.length > 6 && username.length > 2)} variant="contained" type='submit'>Register</Button>
          <Typography>
            You already have an account <Link to="/auth/login">Login here</Link>
          </Typography>
        </Box>
    </Container>
  )
}
