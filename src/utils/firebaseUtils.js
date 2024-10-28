import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase-config";

export const uploadImage = async (file) => {
  if (!file) return null;
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;
  const storageRef = ref(storage, `images/${fileName}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error uploading image: ", error);
    return null;
  }
};

export const deleteImage = async (fileUrl) => {
  const storageRef = ref(storage, fileUrl);
  try {
    await deleteObject(storageRef);
    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image: ", error);
  }
};
