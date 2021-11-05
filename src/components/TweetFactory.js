import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";
import { uploadString, ref,getDownloadURL} from "firebase/storage";
const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
    
        let attachmentUrl = "";
        if(attachment !== "") {
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const uploadFile = await uploadString(fileRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(uploadFile.ref);
        }
        const tweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
         try {
            const docRef = await addDoc(collection(dbService, "tweets"), tweetObj);
            console.log("Document written with ID: ", docRef.id);
        } catch(error) {
            console.error("Error adding document: ", error);
        }
    
        setTweet("");
        setAttachment("");
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
    const onClearPhotoClick = () => setAttachment(null);
    return (
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
    );
}
export default TweetFactory;