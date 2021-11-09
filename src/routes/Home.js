import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";
import Tweet from "components/Tweet";
import { uploadString, ref,getDownloadURL} from "firebase/storage";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {

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
        })
    }, []);

    return (
        <div className="container">
            <TweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={(tweet.creatorId === userObj.uid) ? true : false}></Tweet>
                ))}
            </div>
        </div>
    );
};

export default Home;