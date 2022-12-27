import Image from "next/image";
import { BsCameraFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const ProfileCopy = ({ imgSrc, handlePreview, handleDeleteImg }) => {

	return (
		<div className="absolute top-0 left-0 w-full -translate-y-[40%] flex justify-center">
         <div className="relative h-32 aspect-square rounded-full overflow-hidden border-[6px] border-white cursor-pointer flex-center group">
            <Image src={imgSrc} layout="fill" objectFit="cover" />

            <div className="absolute w-full h-full opacity-0 flex flex-col justify-center items-center text-center group-hover:opacity-100 bg-black/40 text-white">
               <BsCameraFill className="text-2xl" />
               <span className="text-sm">Upload profile</span>
            </div>

            <input
               type="file"
               name="profile"
               id="profile"
               className="absolute opacity-0 -top-1/2 h-[150%] w-full cursor-pointer"
               accept=".jpg,.png,.webp,.jpeg"
               onChange={handlePreview}
            />
         </div>

         <button
            onClick={handleDeleteImg}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] bg-primary text-white flex-center h-6 aspect-square rounded-full"
         >
            <IoClose />
         </button>
		</div>
	);
};

export default ProfileCopy;