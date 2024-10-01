"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";

import Blog_Posts from "@/components/blog_posts";

const GetPosts = () => {
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center">All Posts</h1>

          <Blog_Posts posts={posts} />
        </div>
      </div>
    </>
  );
};

export default GetPosts;
