import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../apis/filrebase/config/firebaseConfig";

export function FirebaseDeleter(imgUrl) {
    deleteObject(ref(storage, imgUrl)).then(() => {
      }).catch((error) => {
        console.log(error);
    });
}

