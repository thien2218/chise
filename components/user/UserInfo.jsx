import { useAuth } from "../../hooks";
import { useLayout } from "../layout/Layout";
import Button from "../common/Button";
import ActionBtn from "../common/ActionBtn";
import ProfileImg from "../common/ProfileImg";
import Link from "next/link";

const UserInfo = ({ user }) => {
	const { authUser } = useAuth();
	const { setReport } = useLayout();

	const formatNumber = (arr) => {
		const num = arr.length;
		const format = ["", "K", "M", "B"];
		let i = 0;

		while (num / 100 > 1) {
			i++;
			num /= 100;
		}

		return num.toString() + format[i];
	};

	return (
		<div className="w-full flex flex-col items-center text-center mb-8 min-w-[375px]">
			<div className="rounded-full overflow-hidden h-[7rem] w-[7rem] my-1">
				<ProfileImg
					profileUrl={user.profileUrl}
					username={user.username}
					size={28}
				/>
			</div>

			<div className="my-1 max-w-[40rem]">
				<h1 className="heading">{user.name}</h1>
				<span className="mt-2 text-dark-gray text-sm">
					@{user.username}
				</span>
			</div>

			{user.about && <p className="my-1 max-w-[40rem]">{user.about}</p>}

			<div className="my-1 font-semibold">
				{formatNumber(user.following)} following -{" "}
				{formatNumber(user.followers)} followers
			</div>

			{authUser.username === user.username ? (
				<div className="my-1 pt-2">
					<button className="secondary-btn px-4 py-3 rounded-full">
						<Link href={`/${authUser.username}/settings/public`}>
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
						list={user.followers}
						altText="Following"
						req={{ action: "follow", id: user.username }}
					>
						Follow
					</ActionBtn>

					<Button
						btnType="secondary-btn"
						onClick={() => setReport({ col: "users", id: user.username })}
						noAsync
					>
						Report
					</Button>
				</div>
			)}
		</div>
	);
};

export default UserInfo;
