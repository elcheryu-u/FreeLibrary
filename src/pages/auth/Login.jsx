import { Button } from '@u_ui/u-ui';
import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const { login } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    await login(email, password)
  }

  return (
    <div>
        <h1>Login</h1>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={handleLogin}>Iniciar sesión</Button>
        <Link to="/auth/register">Hola</Link>
    </div>
  )
}
