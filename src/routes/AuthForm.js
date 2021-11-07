import React, { useState } from "react";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { authService, firebaseInstance } from "fbase";

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccout] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === 'email') {
            setEmail(value);
        } else if(name ==='password') {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        try {
            let data;
            if(!newAccount) {
                // create account
                data = await createUserWithEmailAndPassword(
                    auth, email, password
                )
            } else {
                data = await signInWithEmailAndPassword(
                    auth, email, password
                )
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
    }

    const toggleAccount = () => {
        setNewAccout(prev => !prev);
    }

    return (
        <>
        <form onSubmit={onSubmit}>
                <input
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : " Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Log in" : "Create Account"}</span>
        </>
    )
}
export default AuthForm;