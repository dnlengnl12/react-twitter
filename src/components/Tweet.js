import React from "react";

const Tweet = ({ tweetObj, isOwner }) => (
    <div key={tweetObj.id}>
        <h4>{tweetObj.text}</h4>
        {isOwner && (
            <>
                <button>Delete Tweet</button>
                <button>Edit Tweet</button>
            </>
        )}
    </div>
);

export default Tweet;