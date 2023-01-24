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

	// Create
	async createUser(userData) {
      const { id, ...data } = userData;

		const values = {
         about: "",
         profilePath: "",
         bgrUrl: "",
         bgrPath: "",
			followers: [],
			following: [],
			privateInfo: {
				gender: "male",
				country: "United States of America",
				birthday: new Date().toLocaleDateString('en-ca'),
			},
			...data,
		};

      const userRef = doc(this.db, "users", id);
		return setDoc(userRef, values);
	}

	// Read
	async userExists(username) {
      const q = query(
         collection(this.db, "users"),
         where("username", "==", username)
      );

      const userSnap = await getDocs(q);
      return !userSnap.empty;
	}

	async getUser(id) {
		const userRef = doc(this.db, "users", id);
		const userSnap = await getDoc(userRef);

		if (userSnap.exists()) {
			const userData = userSnap.data();
         userData.id = userSnap.id;
			return userData;
      }
	}

	async getUserIds() {
		const usersSnap = await getDocs(collection(this.db, "users"));
		return usersSnap.docs.map((doc) => doc.id);
	}

	// Update
	async updateUser(id, values) {
		const userRef = doc(this.db, "users", id);
		return updateDoc(userRef, values);
	}

	async updateFollowList(authUserId, userId, containsUser) {
		const batch = writeBatch(this.db);
		const arrOperation = containsUser ? arrayUnion : arrayRemove;

		const userRef = doc(this.db, "users", userId);
		batch.update(userRef, {
			followers: arrOperation(authUserId),
		});

		const authUserRef = doc(this.db, "users", authUserId);
		batch.update(authUserRef, {
			following: arrOperation(userId),
		});

		return batch.commit();
	}

	// Delete
	// async deleteUser(userId) {
	// 	const userRef = doc(this.db, "users", userId);
	// 	return await deleteDoc(userRef);
	// }

	// ------------ PIN ------------

	// Create
	async createPin(values) {
      const { imgFile, ...otherValues } = values;
		return addDoc(collection(this.db, "pins"), otherValues);
	}

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

	queryPinsAfter(createdAt) {
		return startAfter(createdAt);
	}

	queryPinsCreatedBy(userId) {
		return where("creator.id", "==", userId);
	}

	queryPinsSavedBy(userId) {
		return where("savedBy", "array-contains", userId);
	}

	// Update
	async updatePin(pinId, values) {
		const pinRef = doc(this.db, "pins", pinId);
		return updateDoc(pinRef, values);
	}

	async updateCreator(userId, values) {
      const q = query(
         collection(this.db, "pins"),
         where("creator.id", "==", userId)
      );

      return getDocs(q).then((snap) => {
         const batch = writeBatch(this.db);

         snap.docs.forEach((doc) => {
            batch.update(doc.ref, values);
         });

         return batch.commit();
      });
	}

	async updateSavedByList(userId, pinId, containsUser) {
		const pinRef = doc(this.db, "pins", pinId);
		const arrOperation = containsUser ? arrayUnion : arrayRemove;

		return updateDoc(pinRef, {
			savedBy: arrOperation(userId),
		});
	}

	// Delete
	async deletePin(id) {
		const pinRef = doc(this.db, "pins", id);
		return deleteDoc(pinRef);
	}
}

export default new Firestore(app);
