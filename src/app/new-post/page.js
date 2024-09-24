"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/clientApp";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

export default function CreateNewPost() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError(`File size exceeds 5MB limit. Please choose a smaller file.`);
        setFile(null);
      } else {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  const uploadFileWithRetry = async (file, retries = 0) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const metadata = {
        contentType: file.type,
        customMetadata: {
          "Access-Control-Allow-Origin": "*",
        },
      };
      await uploadBytes(storageRef, file, metadata);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error(`Upload attempt ${retries + 1} failed:`, error);
      if (error.code === "storage/unauthorized") {
        console.error("CORS error: Unauthorized access to Firebase Storage");
        throw new Error(
          "Unable to upload file due to CORS restrictions. Please check your Firebase configuration."
        );
      }
      if (retries < MAX_RETRIES) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, retries);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return uploadFileWithRetry(file, retries + 1);
      }
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = null;

      if (file) {
        // Upload the image to Firebase Storage
        imageUrl = await uploadFileWithRetry(file);
        console.log(`Image uploaded: ${imageUrl}`);
      }

      // Prepare post data
      const postData = {
        title,
        content,
        imageUrl, // Image URL from Firebase Storage
        createdAt: new Date(), // Store the timestamp of post creation
      };

      // Attempt to add the document to Firestore
      const docRef = await addDoc(collection(db, "posts"), postData);
      console.log("Document added with ID: ", docRef.id);

      // Clear the form after successful submission
      setTitle("");
      setContent("");
      setFile(null);
      alert(`Post added successfully! ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Failed to add post: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
            Create New Post
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                onChange={handleFileChange}
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
            <div className="flex justify-end space-x-4">
              <button
                type="reset"
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Post"}
              </button>
            </div>
          </form>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
