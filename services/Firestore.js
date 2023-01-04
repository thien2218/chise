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

	// Update
   async updateUser(username, values) {
		const userRef = doc(this.db, "users", username);
      await updateDoc(userRef, values);
   }

	// Create
	async createUser(username, values) {
		const userRef = doc(this.db, "users", username);
		return await setDoc(userRef, values);
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
			pinData.id = id;

			return pinData;
		}
	}

	// Update
   async updatePin(id, values) {
		const pinRef = doc(this.db, "pins", id);
      await updateDoc(pinRef, values);
   }

	// Create
	async createPin(values) {
		const pinRef = doc(this.db, "pins", id);
		return await addDoc(pinRef, values);
	}

	// Delete
   async deletePin(id) {
      const pinRef = doc(this.db, "pins", id);
      await deleteDoc(pinRef);
   }

	// ------------ OTHER ------------
	async updateList(username, containsUser, col, id) {
      const listName = col == "pins" ? "savedBy" : "followers";
		const docRef = doc(this.db, col, id);

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
