import React, { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
    const [tweet, setTweet] = useState("");
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
        </div>
    );
};

export default Home;