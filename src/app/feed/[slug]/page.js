"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";

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

  // Conditional rendering to avoid trying to access postDetail before it's set
  if (!postDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
        <p className="text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-purple-800 via-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Post Image */}
          {postDetail.imageUrl && (
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={postDetail.imageUrl}
                alt={postDetail.title}
                className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}

          {/* Post Title */}
          <h1 className="mt-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-900">
            {postDetail.title}
          </h1>

          {/* Post Content */}
          <div className="mt-4 text-lg leading-relaxed text-gray-300">
            <p>{postDetail.content}</p>
          </div>

          {/* Footer Section for Call to Action or Related Posts */}
          <div className="mt-12 border-t border-gray-600 pt-6">
            <h2 className="text-2xl font-semibold text-white">
              Related Articles
            </h2>
            {/* Add links or related posts here */}
            <p className="mt-2 text-gray-400">
              Check out other posts in the feed.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post_Detail_Page;
