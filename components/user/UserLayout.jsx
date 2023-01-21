import UserInfo from "./UserInfo";
import MasonryLayout from "../common/MasonryLayout";
import LinkBtn from "../common/LinkBtn";
import { useRouter } from "next/router";

const UserLayout = ({ user, pins }) => {
	const { pathname } = useRouter();
	const isCreatedPage = pathname === "/[userId]/created";

	return (
		<>
			<UserInfo user={user} />

			<div className="flex justify-center mb-8">
				<div className="py-3 mx-2">
					<LinkBtn
						href={`/${user.id}/created`}
						isCurrPage={isCreatedPage}
					>
						Created
					</LinkBtn>
				</div>
				<div className="py-3 mx-2">
					<LinkBtn
						href={`/${user.id}/saved`}
						isCurrPage={!isCreatedPage}
					>
						Saved
					</LinkBtn>
				</div>
			</div>

			<MasonryLayout pins={pins} />
		</>
	);
};

export default UserLayout;
