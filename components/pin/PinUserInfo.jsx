import Link from 'next/link';
import ActionBtn from "../common/ActionBtn";
import Avatar from '../common/Avatar';

const PinUserInfo = ({ img, username }) => {
	return (
		<div className="mt-4 flex items-center pr-3 gap-1">
         <Link href="/">
            <a className="mx-1">
               <Avatar size={12} src={img} />
            </a>
         </Link>

         <Link href="/">
            <a className="font-semibold text-sm flex-1">{username}</a>
         </Link>

			<ActionBtn classes="secondary-btn" >Follow</ActionBtn>
		</div>
	);
};

export default PinUserInfo;
