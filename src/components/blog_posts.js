import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";
import Image from "next/image";

export default function Blog_Posts({ posts }) {
  const [likedPosts, setLikedPosts] = useState({});

  const handleLike = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const currentLikes = postSnap.data().likes || 0;
        const isLiked = likedPosts[postId];
        const newLikes = isLiked ? currentLikes - 1 : currentLikes + 1;

        await updateDoc(postRef, {
          likes: newLikes,
        });

        setLikedPosts((prev) => ({
          ...prev,
          [postId]: !isLiked,
        }));

        // Update the likes count in the posts array
        posts = posts.map((post) =>
          post.id === postId ? { ...post, likes: newLikes } : post
        );
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <Link href={`feed/${post.id}`}>
              {post.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={400}
                    height={100}
                    className=" object-cover"
                  
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-white">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-4 truncate">{post.content}</p>
                <b className="text-gray-400 mb-4">{post.user}</b>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">
                    {new Date(post.createdAt.toDate()).toLocaleDateString()}
                  </span>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Read More
                  </button>
                </div>
              </div>
            </Link>
            <div className="px-6 pb-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLike(post.id);
                }}
                className={`flex items-center space-x-2 ${
                  likedPosts[post.id] ? "text-red-500" : "text-gray-400"
                } hover:text-red-500 transition-colors duration-200`}
              >
                <Heart
                  className={likedPosts[post.id] ? "fill-current" : ""}
                  size={20}
                />
                <span className="text-sm font-semibold">
                  {post.likes || 0} likes
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
