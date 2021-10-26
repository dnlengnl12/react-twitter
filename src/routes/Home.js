import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";
import Tweet from "components/Tweet";
import { uploadString, ref } from "firebase/storage";

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState();
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
    const onSubmit = async (event) => {
        event.preventDefault();

        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        console.log(response);
/*         try {
            const docRef = await addDoc(collection(dbService, "tweets"), {
                text: tweet,
                createdAt: Date.now(),
                creatorId: userObj.uid
            });
            console.log("Document written with ID: ", docRef.id);
        } catch(error) {
            console.error("Error adding document: ", error);
        }

        setTweet(""); */
    };
    const onChange = ({target: {value}}) => {
        setTweet(value);
    };
    const onFileChange = (event) => {
        const {target:{files}} = event; // event.target.files
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    };
    const onClearPhotoClick = () => setAttachment(null)
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={tweet}
                    onChange={onChange}
                    type="text"
                    placeholder="what's on your mind"
                    maxLength={120}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                />
                <input type="submit" value="Tweet" />
                {attachment && 
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearPhotoClick}>Clear</button>
                    </div>
                }
            </form>
            <div>
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={(tweet.creatorId === userObj.uid) ? true : false}></Tweet>
                ))}
            </div>
        </div>
    );
};

export default Home;