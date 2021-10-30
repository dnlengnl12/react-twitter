import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { collection, getDocs, query, where } from "firebase/firestore";


export default (userObj) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyNweets = async () => {
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid)
        );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        };
    useEffect(() => {
        getMyTweets();
    }, [])
    return (
        <button onClick={onLogOutClick}>Log out</button>
    );
};