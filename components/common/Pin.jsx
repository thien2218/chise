import AdjustedImg from "./AdjustedImg";
import Image from "next/image";
import Link from "next/link";
import { HiPencil, HiFlag } from "react-icons/hi";
import { MdCloudDownload } from "react-icons/md";
import { IoLink } from "react-icons/io5";

const Pin = () => {
	return (
		<div className="w-full px-1.5 pb-4">
			<AdjustedImg ratio={150}>
            <div className="relative w-full h-full opacity-0 hover:opacity-100 transition duration-100 flex flex-col justify-between">
               <Link href="/">
                  <a className="absolute w-full h-full bg-black/30"></a>
               </Link>

               <div className="flex p-3 pb-0">
                  <button className="h-8 w-8 flex justify-center items-center bg-white/[.65] hover:bg-white/80 rounded-full z-[9] cursor-pointer transition m-1">
                     <HiPencil className="text-lg" />
                  </button>

                  <div className="flex justify-end flex-1">
                     <button className="primary-btn rounded-full px-4 py-3 z-[9]">Save</button>
                  </div>
               </div>

               <div className="flex justify-between p-3 pt-4 gap-2.5">
                  <Link href="https://www.facebook.com">
                     <a className="relative h-full flex bg-white/70 hover:bg-white/[.85] rounded-full z-[9] cursor-pointer transition max-w-max px-3 items-center gap-1.5 min-w-0">
                        <IoLink className="text-xl" />
                        <div className="text-sm truncate">facebook.commm</div>
                     </a>
                  </Link>

                  <div className="flex h-8 gap-2.5">
                     <button className="aspect-square flex justify-center items-center bg-white/70 hover:bg-white/[.85] rounded-full z-[9] transition">
                        <MdCloudDownload className="text-lg" />
                     </button>

                     <button className="aspect-square flex justify-center items-center bg-white/70 hover:bg-white/[.85] rounded-full z-[9] transition">
                        <HiFlag className="text-lg" />
                     </button>
                  </div>
               </div>
            </div>
         </AdjustedImg>

         <div className="py-2 px-1.5">
            <Link href="/">
               <a>
                  <h1 className="font-semibold mb-1 text-sm">Hello World</h1>
               </a>
            </Link>

            <Link href="/">
               <a className="flex items-center hover:last:underline">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                     <Image layout="fill" objectFit="cover" src="/assets/cat1.jpg" />
                  </div>
               
                  <div className="text-sm ml-1.5">Thien Huynh</div>
               </a>
            </Link>
         </div>
		</div>
	);
};

export default Pin;
