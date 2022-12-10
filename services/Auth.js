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

	extractUserData(user) {
      const regex = /^.*?(?=@)/g;

		return {
			id: user.uid,
			username: user.displayName,
			emailShort: user.email.match(regex)[0],
			emailVerified: user.emailVerified,
			profileImg: user.photoURL,
		};
	}

	waitForUser(cb) {
		return onAuthStateChanged(this.auth, (user) => cb(user));
	}

   async updateUsername(username) {
      return updateProfile(this.auth.currentUser, {
         displayName: username,
      }).then(() => {
         return this.extractUserData(this.auth.currentUser);
      })
   }

	async login(email, password) {
		return signInWithEmailAndPassword(this.auth, email, password)
			.catch((err) => {
				return { error: { invalid: "Incorrect email or password" } };
			});
	}

	async signup(email, password) {
		return createUserWithEmailAndPassword(this.auth, email, password)
			.catch((err) => {
				return {
					error: {
						invalid:
							"This email has already been assigned with an existing account",
					},
				};
			});
	}

	async loginWithGoogle() {
		const provider = new GoogleAuthProvider();

		return signInWithPopup(this.auth, provider)
			.then((cred) => {
            const user = this.extractUserData(cred.user);
            const { isNewUser } = getAdditionalUserInfo(cred);
				return { user, isNewUser };
			})
			.catch((err) => {
				return {
					error: {
						invalid:
							"This email has already been assigned with an existing account",
					},
            };
			});
	}

	async logout() {
		await signOut(this.auth);
	}
}

export default new Auth(app);
