import app from "./firebaseConfig";
import { getStorage } from "firebase/storage";

class Storage {
   constructor (app) {
      this.storage = getStorage(app);
   }
}

export default new Storage(app);