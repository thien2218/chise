import { useAuth } from "../../hooks";
import Button from "../common/Button";
import ActionBtn from "../common/ActionBtn";
import ProfileImg from "../common/ProfileImg";
import Link from "next/link";

const UserInfo = ({ user }) => {
	const {
		authUser: { username: authUsername },
	} = useAuth();
	const { name, username, profileUrl, about, followers, following } = user;

	return (
		<div className="w-full flex flex-col items-center text-center mb-8 min-w-[375px]">
			<div className="rounded-full overflow-hidden h-[7rem] w-[7rem] my-1">
				<ProfileImg profileUrl={profileUrl} name={name} size={28} />
			</div>

			<div className="my-1 max-w-[40rem]">
				<h1 className="heading">{name}</h1>
				<span className="mt-2 text-dark-gray text-sm">@{username}</span>
			</div>

			{about && <p className="my-1 max-w-[40rem]">{about}</p>}

			<div className="my-1 font-semibold">
				{following} following - {followers.length} followers
			</div>

			{authUsername == username ? (
				<div className="my-1 pt-2">
					<button className="secondary-btn px-4 py-3">
						<Link href="/settings/public">
							<a>Edit Profile</a>
						</Link>
					</button>
				</div>
			) : (
				<div className="my-1 pt-2 grid grid-cols-3 gap-3">
					<Button btnType="secondary-btn" onClick={() => {}} noAsync>
						Block
					</Button>

					<ActionBtn
						btnType="primary-btn"
						list={followers}
						altText="Followed"
						req={{ col: "users", id: username }}
					>
						Follow
					</ActionBtn>
               
					<Button btnType="secondary-btn" onClick={() => {}} noAsync>
						Report
					</Button>
				</div>
			)}
		</div>
	);
};

export default UserInfo;
