import UserInfo from "../user/UserInfo";
import MasonryLayout from "./MasonryLayout";
import LinkBtn from "../common/LinkBtn";
import { useRouter } from "next/router";

const UserLayout = ({ user, pins }) => {
	const { pathname } = useRouter();
	const isCreatedPage = pathname == "/[username]/created";

	return (
		<>
			<UserInfo user={user} />

			<div className="flex justify-center mb-8">
				<div className="py-3 mx-2">
					<LinkBtn
						href={`/${user.username}/created`}
						text="Created"
						isCurrPage={isCreatedPage}
					/>
				</div>
				<div className="py-3 mx-2">
					<LinkBtn
						href={`/${user.username}/saved`}
						text="Saved"
						isCurrPage={!isCreatedPage}
					/>
				</div>
			</div>

			<MasonryLayout pins={pins} />
		</>
	);
};

export default UserLayout;
