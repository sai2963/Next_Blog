"use client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import PostForm from "@/components/postform";
import HandleFileChange from "@/components/handlefilechange";
import HandleSubmit from "@/components/handleSubmit";

export default function CreateNewPost() {
  const [title, setTitle] = useState();
  const [file, setFile] = useState(null);
  const [content, setContent] = useState();
  const [user, setUser] = useState();

  const [error, setError] = useState(null);
  const router = useRouter();

  return (
    <PostForm
      handleSubmit={(e) =>
        HandleSubmit(
          e,
          title,
          file,
          content,
          user,
          error,
          setTitle,
          setFile,
          setContent,
          setUser,
          setError,
          router
        )
      }
      handleFileChange={(e) => HandleFileChange(e, setFile, setError)}
      error={error}
      title={title}
      content={content}
      file={file}
      user={user}
      setTitle={setTitle}
      setUser={setUser}
      setContent={setContent}
    />
  );
}

