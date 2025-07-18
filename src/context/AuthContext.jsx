import * as React from 'react';
import { createContext } from "react";
import { auth, firestore } from '../services/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(undefined);
    const navigate = useNavigate();

    async function login(email, password) {
        await signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
            setUser(response.user);
            navigate('/');
        })
        .catch(err => {
            console.error(err);
        })
    }

    async function register(email, password, username, randomImageUrl) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            const docSnap = doc(firestore, `collections/${auth.currentUser.uid}`);
            await setDoc(docSnap, {
                books: []
            });

            await updateProfile(auth.currentUser, {
                displayName: username,
                photoURL: randomImageUrl
            })

            navigate('/');
        } catch (err) {
            console.error(err);
        }
    }

    function logout() {
        signOut(auth).then(() => {
            console.log("User signed out successfully.");
            window.location.reload();
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    }

    console.log(user)

    React.useEffect(() => {
        onAuthStateChanged(auth, async (account) => {
            try {
                if (account) {
                    setUser(account);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error(err);
            }
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}