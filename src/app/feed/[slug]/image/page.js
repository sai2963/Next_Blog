"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../firebase/clientApp";
import Link from "next/link";

const Post_Detail_Page = ({ params }) => {
  const postId = params.slug;
  const [postDetail, setPostDetail] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const PostRef = collection(db, "posts");
        const querySnapshot = await getDocs(PostRef);
        const PostData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const PostItem = PostData.find((post) => post.id === postId);

        setPostDetail(PostItem);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPosts();
  }, [postId]);

  if (!postDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
        <p className="text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="m-10 p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl">
          <div className="border-4 border-transparent rounded-lg bg-white p-2"></div>
          {postDetail.imageUrl && (
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={postDetail.imageUrl}
                alt={postDetail.title}
                className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}
        </div>
        <Link
        href={`/feed/${postId}`}
        className="mt-4 text-blue-500 hover:underline"
      >
        Back to Post
      </Link>
      </div>
    </>
  );
};

export default Post_Detail_Page;
