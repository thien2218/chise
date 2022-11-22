import app from "./firebase-config";
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";

class Auth {
	constructor(app) {
		this.auth = getAuth(app);
	}

	extractUserData(user) {
		return {
			id: user.uid,
			username: user.displayName,
			emailShort: user.email,
			emailVerified: user.emailVerified,
			profileImg: user.photoURL,
		};
	}

	waitForUser(cb) {
		return onAuthStateChanged(this.auth, (user) => cb(user));
	}

	async login(email, password) {
		return signInWithEmailAndPassword(this.auth, email, password)
			.then((cred) => {
				return { user: this.extractUserData(cred.user) };
			})
			.catch((err) => {
				return { error: err.message };
			});
	}

	async signup(email, password) {
		return createUserWithEmailAndPassword(this.auth, email, password)
			.then((cred) => {
				return this.extractUserData(cred.user);
			})
			.catch((err) => {
				return err.message;
			});
	}

	async loginWithGoogle() {
		const provider = new GoogleAuthProvider();

		return signInWithPopup(this.auth, provider)
			.then((cred) => {
				return this.extractUserData(cred.user);
			})
			.catch((err) => {
				return err.message;
			});
	}

	async logout() {
		await signOut(this.auth);
	}
}

export default new Auth(app);
