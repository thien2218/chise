import app from "./firebase-config";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

class Firestore {
	constructor(app) {
		this.db = getFirestore(app);
	}

	// ------------ USER ------------

	// Read
	async usernameExists(username) {
		return (await getDoc(doc(this.db, "users", username))).exists();
	}

	// Write

	// Create
	async createUser(username, values) {
		return await setDoc(doc(this.db, "users", username), values);
	}

	// Delete
}

export default new Firestore(app);
