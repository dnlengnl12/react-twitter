import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from "fbase";

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this tweet");
        if(ok) {
            const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
            await deleteDoc(TweetTextRef);
            //delete
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
        await updateDoc(TweetTextRef, {
            text: newTweet,
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target:{value},
        } = event;
        setNewTweet(value);
    };
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input 
                            type="text"
                            placeholder="Edit your Tweet"
                            value={newTweet}
                            required
                            onChange={onChange}    
                        />

                        <input type="submit" value="Edit"></input>
                    </form>
                    <button onClick={toggleEditing}>cancel</button>
                </>
            ) : (
            <>
                 <h4>{tweetObj.text}</h4>
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete Tweet</button>
                        <button onClick={toggleEditing}>Edit Tweet</button>
                    </>
                )}
            </>
        )}
        </div>
    );
}

export default Tweet;