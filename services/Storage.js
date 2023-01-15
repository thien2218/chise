import app from "./firebase-config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

class Storage {
	constructor(app) {
		this.storage = getStorage(app);
	}

	// Upload
	async uploadImage(file, folder) {
		const imgRef = ref(this.storage, `${folder}_images/${file.name}`);
      
		return await uploadBytes(imgRef, file).then(async (snap) => {
			return await getDownloadURL(snap.ref).then((downloadUrl) => {
				return downloadUrl.toString();
			});
		});
	}

	// Delete
}

export default new Storage(app);
