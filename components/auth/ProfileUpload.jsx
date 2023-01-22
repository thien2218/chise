import Avvvatars from "avvvatars-react";
import { BsCameraFill } from "react-icons/bs";

const ProfileUpload = ({ username, handlePreview }) => {
	return (
		<div className="absolute top-0 left-0 w-full -translate-y-[40%] flex justify-center">
         <div className="relative h-32 aspect-square rounded-full overflow-hidden border-[6px] border-white cursor-pointer flex-center group">
            <Avvvatars size={32 * 4} value={username} />

            <div className="absolute w-full h-full opacity-0 flex-center flex-col text-center group-hover:opacity-100 bg-black/40 text-white">
               <BsCameraFill className="text-2xl" />
               <span className="text-sm">Upload profile</span>
            </div>

            <input
               type="file"
               name="profileUrl"
               className="absolute opacity-0 -top-full h-[200%] w-full cursor-pointer"
               accept=".jpg,.png,.webp,.jpeg"
               onChange={handlePreview}
            />
         </div>
		</div>
	);
};

export default ProfileUpload;