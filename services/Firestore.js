import app from "./firebase-config";
import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	limit,
	orderBy,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";

class Firestore {
	constructor(app) {
		this.db = getFirestore(app);
	}

	// ------------ USER ------------

	// Read
	async usernameExists(username) {
		const userRef = doc(this.db, "users", username);
		const user = await getDoc(userRef, username);
		return user.exists();
	}

	async getUser(username) {
		const userRef = doc(this.db, "users", username);
		const userSnap = await getDoc(userRef);

		if (userSnap.exists()) {
			const userData = userSnap.data();
			return userData;
		}
	}

	async getUsers() {
		const usersSnap = await getDocs(collection(this.db, "users"));

		return usersSnap.docs.map((doc) => {
			return doc.data();
		});
	}

	// Update
	async updateUser(username, values) {
		const userRef = doc(this.db, "users", username);
		return await updateDoc(userRef, values);
	}

	// Create
	async createUser(username, values) {
		const userRef = doc(this.db, "users", username);
		return await setDoc(userRef, values);
	}

	// Delete
	async deleteUser(username) {
		const userRef = doc(this.db, "users", username);
		return await deleteDoc(userRef);
	}

	// ------------ PIN ------------

	// Read
	async getPin(id) {
		const pinRef = doc(this.db, "pins", id);
		const pinSnap = await getDoc(pinRef);

		if (pinSnap.exists()) {
			const pinData = pinSnap.data();
			return pinData;
		}
	}

	async getPinsByQuery(q) {
		const pinsSnap = await getDocs(q);

		return pinsSnap.docs.map((doc) => {
			return doc.data();
		});
	}

	queryPins() {
		const q = query(
			collection(this.db, "pins"),
			// limit(60),
			orderBy("createdAt", "desc")
		);

		return q;
	}

	queryPinsCreatedBy(username) {
		const q = query(
			collection(this.db, "pins"),
			// limit(30),
			where("creator.username", "==", username)
		);

		return q;
	}

	queryPinsSavedBy(username) {
		const q = query(
			collection(this.db, "pins"),
			// limit(30),
			where("savedBy", "array-contains", username)
		);

		return q;
	}

	queryPinsExcept(id) {
		const q = query(
			collection(this.db, "pins"),
			// limit(30),
			where("id", "!=", id)
		);

		return q;
	}

	// Update
	async updatePin(id, values) {
		const pinRef = doc(this.db, "pins", id);
		return await updateDoc(pinRef, values);
	}

	// Create
	async createPin(values) {
		const pinRef = await addDoc(collection(this.db, "pins"), values);
		return await updateDoc(pinRef, {
			id: pinRef.id,
		});
	}

	// Delete
	async deletePin(id) {
		const pinRef = doc(this.db, "pins", id);
		return await deleteDoc(pinRef);
	}

	// ------------ OTHER ------------
	async updateList(username, containsUser, col, id) {
		const listName = col == "pins" ? "savedBy" : "followers";
		const docRef = doc(this.db, col, id);

		if (containsUser) {
			return await updateDoc(docRef, {
				[listName]: arrayUnion(username),
			});
		}

		return await updateDoc(docRef, {
			[listName]: arrayRemove(username),
		});
	}
}

export default new Firestore(app);
