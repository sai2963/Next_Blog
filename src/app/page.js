"use client";
import React from "react";
import { Search, Menu, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/clientApp";
import Link from "next/link";
import Blog_Posts from "@/components/blog_posts";
export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState();
  const [subscribe, setSubscribe] = useState(false);
  const [error, setError] = useState(null);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    setSubscribe(true);
    try {
      const emailData = { email, createdAt: new Date() };
      const docRef = await addDoc(collection(db, "emails"), emailData);
      setEmail();
      alert(`Subscribed Successfully Your Subscription Id${docRef.id}`);
    } catch (error) {
      setError(`Error ${error}`);
    } finally {
      setSubscribe(false);
    }
  };
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center px-6">
          <header className="container mx-auto px-6 py-16 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Elevate Your Perspective
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Dive into a world of insightful articles, curated for the
              discerning reader.
            </p>
            <Link
              href={`/feed`}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
            >
              Explore Articles
            </Link>
          </header>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
        <Blog_Posts posts={posts} />
      </section>

      {/* Newsletter */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join our newsletter and get the latest insights delivered directly
            to your inbox.
          </p>
          <form className="max-w-md mx-auto flex" onSubmit={HandleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-r-full transition duration-300"
            >
              {subscribe ? "Subscribing" : "Subscribe"}
            </button>
          </form>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">BlogElite</div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          © 2024 BlogElite. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
