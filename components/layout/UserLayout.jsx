import UserInfo from "../user/UserInfo";
import MasonryLayout from "./MasonryLayout";
import Link from "next/link";
import { useRouter } from "next/router";

const UserLayout = ({ user, pins }) => {
	const { pathname } = useRouter();
	const isCreatedPage = pathname == "/[username]/created";

	return (
		<>
			<UserInfo user={user} />

			<div className="flex justify-center mb-8">
				<div className="py-3 mx-2">
					<Link href={`/${user.username}/created`}>
						<a
							className={`relative p-2 font-semibold rounded-lg hover:bg-dimmed-500 ${
								isCreatedPage &&
								"pointer-events-none before:w-[calc(100%_-_16px)] before:h-[3px] before:bg-gray-900 before:rounded-full before:absolute before:-bottom-[3px]"
							}`}
						>
							Created
						</a>
					</Link>
				</div>
				<div className="py-3 mx-2">
					<Link href={`/${user.username}/saved`}>
						<a
							className={`relative p-2 font-semibold rounded-lg hover:bg-dimmed-500 ${
								!isCreatedPage &&
								"pointer-events-none before:w-[calc(100%_-_16px)] before:h-[3px] before:bg-gray-900 before:rounded-full before:absolute before:-bottom-[3px]"
							}`}
						>
							Saved
						</a>
					</Link>
				</div>
			</div>

			<MasonryLayout pins={pins} />
		</>
	);
};

export default UserLayout;
