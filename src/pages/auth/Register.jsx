import { Button } from '@u_ui/u-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

export default function Register() {
  const { register } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleRegister = async () => {
    await register(email, password, username)
  }

  return (
    <div>
        <h1>Register</h1>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={handleRegister}>Iniciar sesión</Button>
        <Link to="/auth/login">Hola</Link>
    </div>
  )
}
