import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";
import UploadFilewithRetry from "@/components/retryUpload";

const HandleSubmit = async (
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
) => {
    e.preventDefault();
  setError(null);
  try {
    let imageUrl = null;

    if (file) {
      imageUrl = await UploadFilewithRetry(file);
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
    e.target.reset();
    // setContent("");
    // setTitle("");
    // setUser("");
    // setError(null);
    // setFile(null);
    alert(`Post added successfully! ID: ${docRef.id}`);
    router.push("/feed");
  } catch (error) {
    setError(console.log(error));
  } finally {
    console.log("All Good");
  }
};

export default HandleSubmit;
