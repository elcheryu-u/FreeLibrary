import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../services/firebase";

export default async function saveBook(book, user, search) {
    try {
        const docRef = doc(firestore, `collections/${user.uid}`);
        const dataSnap = await getDoc(docRef);

        const new_book = {
            ...book,
            free_library_search: search
        }

        if (dataSnap.exists()) {
            await updateDoc(docRef, {
                books: arrayUnion(new_book)
            })
            return new_book;
        } else {
            await setDoc(docRef, {
                books: arrayUnion(new_book)
            })
            return new_book;
        }
        
    } catch (error) {
        console.error(error)
    }
}