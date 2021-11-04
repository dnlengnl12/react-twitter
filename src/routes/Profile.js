import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default ({ refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyTweets = async () => {
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, {displayName:newDisplayName});
        }
        refreshUser();
    }
    useEffect(() => {
        getMyTweets();
    }, [])
    return (
        <>
        <form onSubmit={onSubmit}>
            <input
                onChange={onChange}
                type="text"
                placeholder="Display name"
                value={newDisplayName}
            />
            <input type="submit" value="Update Profile"/>
        </form>     
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};