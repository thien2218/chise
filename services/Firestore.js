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
	startAfter,
	updateDoc,
	where,
	writeBatch,
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
         userData.username = userSnap.id;
			return userData;
		}
	}

	async getUsers() {
		const usersSnap = await getDocs(collection(this.db, "users"));

		return usersSnap.docs.map((doc) => {
			const data = doc.data();
			data.username = doc.id;
			return data;
		});
	}

	// Update
	async updateUser(username, values) {
		const userRef = doc(this.db, "users", username);
		return await updateDoc(userRef, values);
	}

	async updateFollowList(authUsername, username, containsUser) {
		const batch = writeBatch(this.db);
		const arrOperation = containsUser ? arrayUnion : arrayRemove;

		const userRef = doc(this.db, "users", username);
		batch.update(userRef, {
			followers: arrOperation(authUsername),
		});

		const authUserRef = doc(this.db, "users", authUsername);
		batch.update(authUserRef, {
			following: arrOperation(username),
		});

		return await batch.commit();
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
         pinData.id = pinSnap.id;
			return pinData;
		}
	}

	async getPinsByQuery(conditionalQ = where("createdAt", "!=", null)) {
		const q = query(
			collection(this.db, "pins"),
			limit(42),
			orderBy("createdAt", "desc"),
			conditionalQ
		);
		const pinsSnap = await getDocs(q);

		return pinsSnap.docs.map((doc) => {
			const data = doc.data();
			data.id = doc.id;
			return data;
		});
	}

	queryLastVisible(lastSnap) {
		return startAfter(lastSnap);
	}

	queryPinsCreatedBy(username) {
		return where("creator.username", "==", username);
	}

	queryPinsSavedBy(username) {
		return where("savedBy", "array-contains", username);
	}

	// Update
	async updatePin(id, values) {
		const pinRef = doc(this.db, "pins", id);
		return await updateDoc(pinRef, values);
	}

	async updateSavedByList(username, pinId, containsUser) {
		const pinRef = doc(this.db, "pins", pinId);
		const arrOperation = containsUser ? arrayRemove : arrayUnion;

		return await updateDoc(pinRef, {
			savedBy: arrOperation(username),
		});
	}

	// Create
	async createPin(values) {
		return await addDoc(collection(this.db, "pins"), values);
	}

	// Delete
	async deletePin(id) {
		const pinRef = doc(this.db, "pins", id);
		return await deleteDoc(pinRef);
	}
}

export default new Firestore(app);
