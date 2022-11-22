import app from "./firebase-config";
import { getFirestore } from "firebase/firestore";

class Firestore {
   constructor (app) {
      this.db = getFirestore(app);
   }
}

export default new Firestore(app);