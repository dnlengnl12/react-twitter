import React from "react";

const Tweet = ({ tweetObj, isOwner }) => {
    const onDeleteClick = () => {
        const ok = confirm("Are you sure you want to delete this tweet");
        if(ok) {
            await deleteDoc(TweetTextRef);
            //delete
        }
    }
    return (
        <div key={tweetObj.id}>
            <h4>{tweetObj.text}</h4>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Tweet</button>
                    <button>Edit Tweet</button>
                </>
            )}
        </div>
    );
}

export default Tweet;