import Link from "next/link";
import ProfileImg from "../common/ProfileImg";

const PinUserInfo = ({ id, profileUrl, username, name }) => {
	return (
		<div className="mt-4 flex items-center pr-3 gap-1">
         <Link href={`/${id}/created`}>
            <a className="mx-1">
               <ProfileImg profileUrl={profileUrl} username={username} size={12} />
            </a>
         </Link>

			<Link href={`/${id}/created`}>
				<a className="font-semibold text-sm flex-1">{name}</a>
			</Link>
		</div>
	);
};

export default PinUserInfo;
