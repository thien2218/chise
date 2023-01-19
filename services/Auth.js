import app from "./firebase-config";
import {
	createUserWithEmailAndPassword,
	getAdditionalUserInfo,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";

class Auth {
	constructor(app) {
		this.auth = getAuth(app);
	}

	waitForUser(cb) {
		return onAuthStateChanged(this.auth, (user) => cb(user));
	}

	extractUserData(user) {
		const strName = user.displayName ?? "";
		const nameAndUsername = strName.split("@");

		return {
         id: user.uid,
			name: nameAndUsername[0],
			username: nameAndUsername[1],
			emailVerified: user.emailVerified,
			profileUrl: user.photoURL ?? "",
         email: user.email,
		};
	}

	async updateUser(displayName, photoURL) {
		return updateProfile(this.auth.currentUser, {
			displayName,
			photoURL,
		}).then(() => {
			return this.extractUserData(this.auth.currentUser);
		});
	}

	async login(email, password) {
		return signInWithEmailAndPassword(this.auth, email, password).catch(
			(err) => {
				return { error: { invalid: "Incorrect email or password" } };
			}
		);
	}

	async signup(email, password) {
		return createUserWithEmailAndPassword(this.auth, email, password).catch(
			(err) => {
				return {
					error: {
						invalid:
							"This email has already been assigned with an existing account",
					},
				};
			}
		);
	}

	async loginWithGoogle() {
		const provider = new GoogleAuthProvider();

		return signInWithPopup(this.auth, provider)
			.then((cred) => {
				const { isNewUser } = getAdditionalUserInfo(cred);
				return { user: cred.user, isNewUser };
			})
			.catch((err) => {
				if (err.code != "auth/popup-closed-by-user") {
					return {
						error: {
							invalid:
								"This email has already been assigned with an existing account",
						},
					};
				} else {
					return { error: {} };
				}
			});
	}

	async logout() {
		return signOut(this.auth);
	}
}

export default new Auth(app);
