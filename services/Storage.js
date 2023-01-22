import app from "./firebase-config";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

class Storage {
	constructor(app) {
		this.storage = getStorage(app);
	}

	// Upload
	async uploadImg(file, folder) {
      const path = `${folder}_images/${file.name}`
		const imgRef = ref(this.storage, path);
      
		return await uploadBytes(imgRef, file).then(async (snap) => {
			return await getDownloadURL(snap.ref).then((downloadUrl) => {
				return { downloadUrl, path };
			});
		});
	}

	// Delete
   async deleteImg(path) {
      const imgRef = ref(this.storage, path);
      return await deleteObject(imgRef);
   }
}

export default new Storage(app);
