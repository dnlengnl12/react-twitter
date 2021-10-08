import React, { useState } from "react";
import AppRouter from "components/Router";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { authService, firebaseInstance } from "fbase";


const Auth = () => {
    
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

    const onSocialClick = async (event) => {
        const {target: {name}} = event;
        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        } else if(name === "github") {
            provider = new GithubAuthProvider();
            
        }

        const auth = getAuth();
        const data = await signInWithPopup(auth, provider)
        console.log(data);
    }
    return (
        <div>
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
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;