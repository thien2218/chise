import app from "./firebase-config";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getFirestore,
	setDoc,
} from "firebase/firestore";

class Firestore {
	constructor(app) {
		this.db = getFirestore(app);
	}

	// ------------ USER ------------

	// Read
	async usernameExists(username) {
		const user = await getDoc(doc(this.db, "users", username));
		return user.exists();
	}

	// Write

	// Create
	async createUser(username, values) {
		return await setDoc(doc(this.db, "users", username), values);
	}

	// Delete

	// ------------ PIN ------------

	// Read

	// Write

	// Create
	async createPin(values) {
		return await addDoc(collection(this.db, "pins"), values);
	}

	// Delete
}

export default new Firestore(app);
