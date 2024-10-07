import { ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/clientApp";
const UploadFilewithRetry = async (file, retries = 0) => {
  
  const MAX_RETRIES = 3;
  const INITIAL_RETRY_DELAY = 1000;
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file, { content: file.type });
    return await getDownloadURL(storageRef);
  } catch (error) {
    if (retries < MAX_RETRIES) {
      const delay = INITIAL_RETRY_DELAY * Math.pow(2, retries);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return UploadFilewithRetry(file, retries + 1);
    }
    throw error;
  }
};

export default UploadFilewithRetry;
