import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../services/firebase";

export default async function getBooks() {
    const user = auth.currentUser;
    try {
        const docRef = doc(firestore, `collections/${user.uid}`);

        const dataSnap = await getDoc(docRef);

        if (dataSnap.exists()) {
            return dataSnap.data().books;
        } else {
            throw new Error("No books")
        }
        
    } catch (error) {
        console.error(error)
    }
}