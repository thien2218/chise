import app from "./firebase-config";
import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	limit,
	orderBy,
	query,
	setDoc,
	updateDoc,
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
		const userRef = doc(this.db, "users", username);
		const userSnap = await getDoc(userRef);

		if (userSnap.exists()) {
			const userData = userSnap.data();
			userData.username = userSnap.id;

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

	async getPin(id) {
		const pinRef = doc(this.db, "pins", id);
		const pinSnap = await getDoc(pinRef);

		if (pinSnap.exists()) {
			const pinData = pinSnap.data();
			pinData.id = pinSnap.id;

			return pinData;
		}
	}

	// Write

	// Create
	async createPin(values) {
		return await addDoc(collection(this.db, "pins"), values);
	}

	// Delete

	// ------------ OTHER ------------
	async writeList(username, containsUser, req) {
		const col = req == "save" ? "pins" : "users";
      const listName = req == "save" ? "savedBy" : "followers";
		const docRef = doc(this.db, col, username);

		if (containsUser) {
			await updateDoc(docRef, {
				[listName]: arrayUnion(username),
			});
		} else {
			await updateDoc(docRef, {
				[listName]: arrayRemove(username),
			});
		}
	}
}

export default new Firestore(app);
