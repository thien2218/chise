import Image from "next/image";
import React from "react";

const UserInfo = ({ username, emailShort, description, follows, viewOthers }) => {
	return (
		<div className="w-full flex flex-col items-center text-center mb-8 min-w-[375px]">
			<div className="rounded-full overflow-hidden h-[7.5rem] w-[7.5rem] my-1">
				<Image
					src="/assets/cat.jpg"
					objectFit="cover"
					layout="responsive"
					height={1}
					width={1}
				/>
			</div>

			<div className="my-1 max-w-[40rem]">
				<h1 className="heading">Thien Huynh</h1>

				<span className="mt-2 text-dark-gray text-sm">@thien123456</span>
			</div>

         <p className="my-1 max-w-[40rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt minima alias eaque qui cum labore optio officia, fugit veniam tenetur.
         </p>

			<div className="my-1 font-semibold">0 following</div>

         {!viewOthers ? (
            <div className="my-1 pt-2">
               <button className="secondary-btn rounded-2xl py-3 px-4">Edit Profile</button>
            </div>
         ) : (
            <div className="my-1 pt-2 grid grid-cols-3 gap-4">
               <button className="secondary-btn rounded-2xl py-3 px-4">Block</button>
               <button className="primary-btn py-3 px-4 rounded-2xl">Follow</button>
               <button className="secondary-btn rounded-2xl py-3 px-4">Report</button>
            </div>
         )}
		</div>
	);
};

export default UserInfo;
