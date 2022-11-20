import app from "./firebase";
import { getFirestore } from "firebase/firestore";

class Firestore {
   constructor (app) {
      this.db = getFirestore(app);
   }
}

export default Firestore(app);