import app from "./firebase-config";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	limit,
	orderBy,
	query,
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

	async getUser(username) {
		const docRef = doc(this.db, "users", username);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const userData = docSnap.data();
			userData.username = docSnap.id;

			return userData;
		}
	}

	// Write

	// Create
	async createUser(username, values) {
		return await setDoc(doc(this.db, "users", username), values);
	}

	// Delete

	// ------------ PIN ------------

	// Read
	async getPins() {
		const q = query(
			collection(this.db, "pins"),
			limit(60),
			orderBy("createdAt", "desc")
		);
		const pinsSnap = await getDocs(q);

		return pinsSnap.docs.map((doc) => {
			const data = doc.data();
			data.id = doc.id;
			return data;
		});
	}

	// Write

	// Create
	async createPin(values) {
		return await addDoc(collection(this.db, "pins"), values);
	}

	// Delete
}

export default new Firestore(app);
