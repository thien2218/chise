import Link from "next/link";
import ActionBtn from "../common/ActionBtn";
import ProfileImg from "../common/ProfileImg";
import { useAuth } from "../../hooks";

const PinUserInfo = ({ profileUrl, username, name, followers }) => {
	const {
		authUser: { username: authUsername },
	} = useAuth();

	return (
		<div className="mt-4 flex items-center pr-3 gap-1">
         <Link href={`/${username}/created`}>
            <a className="mx-1">
               <ProfileImg profileUrl={profileUrl} name={name} size={12} />
            </a>
         </Link>

			<Link href={`/${username}/created`}>
				<a className="font-semibold text-sm flex-1">{name}</a>
			</Link>

			{username != authUsername && (
				<ActionBtn
					btnType="secondary-btn"
					list={followers}
					altText="Followed"
					req={{ col: "users", id: username }}
				>
					Follow
				</ActionBtn>
			)}
		</div>
	);
};

export default PinUserInfo;
