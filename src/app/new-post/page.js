"use client";
import { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/clientApp";
import { redirect, useRouter } from "next/navigation";
import FormSubmit from "@/components/post-submit";

const MY_FILE_SIZE = 5 * 1024 * 1024;
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

export default function CreateNewPost() {
  const [title, setTitle] = useState();
  const [file, setFile] = useState(null);
  const [content, setContent] = useState();
  const [user, setUser] = useState();

  const [error, setError] = useState(null);
  const router = useRouter();

  const HandleFileChange = (e) => {
    const selectedfile = e.target.files[0];
    if (selectedfile) {
      if (selectedfile.size > MY_FILE_SIZE) {
        setError(
          "The Selected File is Exceeded the Size Limit Select Another File"
        );
        setFile(null);
      } else {
        setFile(selectedfile);
        setError(null);
      }
    }
  };
  const uploadFilewithRetry = async (file, retries = 0) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file, { content: file.type });
      return await getDownloadURL(storageRef);
    } catch (error) {
      if (retries < MAX_RETRIES) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, retries);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return uploadFilewithRetry(file, retries + 1);
      }
      throw error;
    }
  };

  const HandleSubmit = async (e) => {
    setError(null);
    try {
      let imageUrl = null;

      if (file) {
        imageUrl = await uploadFilewithRetry(file);
      }
      if (!title || title.trim().length === 0) {
        setError("Title is required");
        return;
      }
      if (!file) {
        setError("File is required");
        return;
      }
      if (!content || content.trim().length === 0) {
        setError("Content is required");
        return;
      }
      if (!user || user.trim().length === 0) {
        setError("User is required");
        return;
      }

      const PostData = {
        title,
        imageUrl,
        content,
        user,
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(db, "posts"), PostData);
      //e.target.reset();
      setContent("");
      setTitle("");
      setUser("");
      setError(null);
      setFile(null);
      alert(`Post added successfully! ID: ${docRef.id}`);
      router.push("/feed");
    } catch (error) {
      setError("Failed to Add Post");
    } finally {
      console.log("All Good");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
            Create New Post
          </h1>
          <form className="space-y-6" action={HandleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Image
              </label>
              <input
                type="file"
                accept="image/jpg, image/png"
                id="image"
                name="image"
                onChange={HandleFileChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="user"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                User
              </label>
              <input
                type="text"
                id="user"
                name="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <FormSubmit />
            </div>
          </form>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
