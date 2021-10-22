import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { dbService } from "fbase";

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTeet] = useState(tweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this tweet");
        if(ok) {
            const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
            await deleteDoc(TweetTextRef);
            //delete
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    return (
        <div>
            {editing ? (
                <>
                    <form>
                        <input value={newTweet} required/>
                    </form>
                    <button onClick={toggleEditing}>cancel</button>
                </>
             ) : (
            <>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Tweet</button>
                    <button onClick={toggleEditing}>Edit Tweet</button>
                </>
            )}
            </>
        )};
        </div>
    )
}

export default Tweet;