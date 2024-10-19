'use client'
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

export default function GetPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postRef = collection(db, "posts");
            const querySnapShot = await getDocs(postRef);
            const postData = querySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(postData);
        };
        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return <div>Loading...</div>;
    }

    return posts;
}