import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";

const Home = ({ userObj }) => {
    console.log(userObj);
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    useEffect(() => {
        onSnapshot(
            query(collection(dbService, "tweets"), orderBy("createdAt", "desc")),
                (snapshot) => {
                    const tweetArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            setTweets(tweetArray);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const docRef = await addDoc(collection(dbService, "tweets"), {
                text: tweet,
                createdAt: Date.now(),
                creatorId: userObj.uid
            });
            console.log("Document written with ID: ", docRef.id);
        } catch(error) {
            console.error("Error adding document: ", error);
        }

        setTweet("");
    };
    const onChange = ({target: {value}}) => {
        setTweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={tweet} onChange={onChange}type="text" placeholder="what's on your mind" maxLength={120} />
                <input type="submit" value="Tweet" />
            </form>
            <div>
                {tweets.map(tweet => <div key={tweet.id}>
                    <h4>{tweet.text}</h4>
                    </div>)}
            </div>
        </div>
    );
};

export default Home;