import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

export default async function getPosts() {
  const postRef = collection(db, "posts");
  const querySnapShot = await getDocs(postRef);
  const postData = querySnapShot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt ? data.createdAt.toMillis() : null,
    };
  });
  return postData;
}

