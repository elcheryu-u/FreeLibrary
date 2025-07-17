import * as React from 'react';
import { createContext } from "react";
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState({});
    const navigate = useNavigate();

    async function login(email, password) {
        await signInWithEmailAndPassword(auth, email, password)
        .then(response => {
            setUser(response.user);
            navigate('/');
        })
        .catch(err => {
            console.error(err);
        })
    }

    async function register(email, password, username) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(auth.currentUser, {
                displayName: username,
                photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT59u6mRVrOV-UTnDkCibUbnm7NY3Ke7GZTYw&s'
            })
        } catch (err) {
            console.error(err);
        }
    }

    console.log(user)

    React.useEffect(() => {
        onAuthStateChanged(auth, async (account) => {
            try {
                if (account) {
                    setUser(account);
                }
            } catch (err) {
                console.error(err);
            }
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user: user,
                login: login,
                register: register
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}