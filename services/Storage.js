import app from "./firebase";
import { getStorage } from "firebase/storage";

class Storage {
   constructor (app) {
      this.storage = getStorage(app);
   }
}

export default Storage(app);