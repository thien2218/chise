import Image from "next/image";
import { useAuth } from "../../hooks";
import Avvvatars from "avvvatars-react";

const UserInfo = ({ user }) => {
	const { authUser: { username: authUsername } } = useAuth();
	const { name, username, profileUrl, about } = user;

	return (
		<div className="w-full flex flex-col items-center text-center mb-8 min-w-[375px]">
			<div className="rounded-full overflow-hidden h-[7rem] w-[7rem] my-1">
				{profileUrl ? (
					<Image
						src={profileUrl}
						objectFit="cover"
						layout="responsive"
						height={1}
						width={1}
					/>
				) : (
					<Avvvatars size={28 * 4} value={name} />
				)}
			</div>

			<div className="my-1 max-w-[40rem]">
				<h1 className="heading">{name}</h1>
				<span className="mt-2 text-dark-gray text-sm">@{username}</span>
			</div>

			{about && <p className="my-1 max-w-[40rem]">{about}</p>}

			<div className="my-1 font-semibold">0 following - 0 followers</div>

			{authUsername == username ? (
            <div className="my-1 pt-2">
               <button className="secondary-btn rounded-2xl py-3 px-4">Edit Profile</button>
            </div>
         ) : (
            <div className="my-1 pt-2 grid grid-cols-3 gap-3">
               <button className="secondary-btn rounded-full py-3 px-4">
                  Block
               </button>
               <button className="primary-btn py-3 px-4 rounded-full">
                  Follow
               </button>
               <button className="secondary-btn rounded-full py-3 px-4">
                  Report
               </button>
            </div>
			)}
		</div>
	);
};

export default UserInfo;
