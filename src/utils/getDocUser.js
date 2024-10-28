import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export const getUserById = async (userId) => {
  const userRef = doc(db, "users", userId);
  const docSnapshot = await getDoc(userRef);

  if (docSnapshot.exists()) {
    const userData = docSnapshot.data();
    userData.id = userId;
    return userData;
  } else {
    null;
  }
};
