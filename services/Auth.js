import app from "./firebase";
import { getAuth } from "firebase/auth";

class Auth {
   constructor (app) {
      this.auth = getAuth(app);
   }
}

export default Auth(app);