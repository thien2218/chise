import { useContext, createContext } from "react";
import { Firestore, Auth, Storage } from "../services";
import { useAuth } from "./AuthProvider";
import { useValidation } from "./ValidationProvider";

const DbContext = createContext();
export const useDb = () => useContext(DbContext);

const DbProvider = ({ children }) => {
	const { authUser, setAuthUser } = useAuth();
	const { setError } = useValidation();

	const addPin = async (imgFile, values) => {
		const { id, emailVerified, ...author } = authUser;
		const imgUrl = await Storage.uploadImage(imgFile, "pin");
		return await Firestore.createPin({ author, imgUrl, ...values });
	};

	const addUser = async ({ username, name, about, imgFile }) => {
		const { username: prevUsername, ...userData } = authUser;
		const displayName = name + "@" + username;
		const emailAsUsername = prevUsername == username;
		const profileUrl = imgFile
			? await Storage.uploadImage(imgFile, "profile") : "";

		if (emailAsUsername || !(await Firestore.usernameExists(username))) {
			const updatedUser = await Auth.updateUser(displayName, profileUrl);
			setAuthUser(updatedUser);
			await Firestore.createUser(username, {
				profileUrl,
				...userData,
				name,
				about,
            followers: [],
            following: 0,
			});
		} else {
			setError({
				invalid: "This username has already existed",
			});
		}
	};

   const writeList = async (username, containsUser, req) => {
      await Firestore.writeList(username, containsUser, req);
   }

	const compressImg = (file, size, name, setImgSrc, setImgFile, setValues) => {
		if (!file) return;

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = function (e) {
			const imgEle = document.createElement("img");
			const imgSrc = e.target.result;
			imgEle.src = imgSrc;

			imgEle.onload = function (event) {
				const canvas = document.createElement("canvas");
				const W = event.target.width >= size ? size : event.target.width;
				const H = (event.target.height * W) / event.target.width;

				const imgRatio = Math.floor((H / W) * 100);
				const createdAt = new Date().getTime();
				canvas.height = H;
				canvas.width = W;

				setValues((prev) => ({
					...prev,
					imgRatio,
					createdAt,
				}));
				setImgSrc(imgSrc);

				const ctx = canvas.getContext("2d");
				ctx.drawImage(imgEle, 0, 0, W, H);

				canvas.toBlob(
					(blob) => {
						const imgFile = new File(
							[blob],
							`${name}-image${createdAt}.webp`,
							{ type: "image/webp" }
						);
						setImgFile(imgFile);
					},
					"image/webp",
					0.85
				);
				canvas.remove();
			};
			imgEle.remove();
		};
	};

	const value = {
		addPin,
		addUser,
      writeList,
		compressImg,
	};

	return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};

export default DbProvider;
