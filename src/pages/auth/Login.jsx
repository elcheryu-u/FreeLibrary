import { Box, Button, Container, styled, Typography } from '@u_ui/u-ui';
import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

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

export default function Login() {
  const { login } = React.useContext(AuthContext);

  const [loading, setLoading] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password)
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 10}}>
        <Typography gutterBottom variant='h2' textTransform="uppercase" component="h1">Login</Typography>
        
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
          component='form'
          onSubmit={handleLogin}
        >
          <InputWrapper>
            <label for="email">Email</label>
            <Input placeholder='Write your email' id="email" type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </InputWrapper>
          <InputWrapper>
            <label for="password">Password</label>
            <Input placeholder='Write your password' id="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </InputWrapper>
          <Button loading={loading} disabled={!(email.length > 6 && password.length > 6)} variant="contained" type='submit' onClick={handleLogin}>Login</Button>
          <Typography>
            Don't have account? <Link to="/auth/register">Register here</Link>
          </Typography>
        </Box>
    </Container>
  )
}
