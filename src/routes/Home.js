import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const Home = () => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const getTweets = async () => {
        const q = query(collection(dbService, "tweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const tweetObj = {
                ...doc.data(),
                id:doc.id,
            }
            setTweets(prev => [tweetObj, ...prev]);
        });
    };
    useEffect(() => {
        getTweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const docRef = await addDoc(collection(dbService, "tweets"), {
                tweet,
                createdAt: Date.now(),
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
                    <h4>{tweet.tweet}</h4>
                    </div>)}
            </div>
        </div>
    );
};

export default Home;