import Link from "next/link";
import ActionBtn from "../common/ActionBtn";
import Avatar from "../common/Avatar";
import { useAuth } from "../../hooks";
import Avvvatars from "avvvatars-react";

const PinUserInfo = ({ profileUrl, username, name, followers }) => {
	const {
		authUser: { username: authUsername },
	} = useAuth();

	return (
		<div className="mt-4 flex items-center pr-3 gap-1">
			{profileUrl ? (
				<Link href="/">
					<a className="mx-1">
						<Avatar size={12} src={profileUrl} />
					</a>
				</Link>
			) : (
				<Avvvatars size={12 * 4} value={name} />
			)}

			<Link href={`/${username}/created`}>
				<a className="font-semibold text-sm flex-1">{name}</a>
			</Link>

			{username != authUsername && (
				<ActionBtn
					btnType="secondary-btn"
					list={followers}
					altText="Followed"
					req="follow"
				>
					Follow
				</ActionBtn>
			)}
		</div>
	);
};

export default PinUserInfo;
