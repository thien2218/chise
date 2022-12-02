import Image from 'next/image';
import Link from 'next/link';
import ActionBtn from "../common/ActionBtn";

const PinUserInfo = ({ img, username }) => {
	return (
		<div className="mt-4 flex items-center pr-3 gap-1">
         <Link href="/">
            <a className="mx-1 rounded-full overflow-hidden h-11 w-11 relative">
               <Image
                  src={img}
                  objectFit="cover"
                  layout="fill"
               />
            </a>
         </Link>

         <Link href="/">
            <a className="font-semibold text-sm flex-1">{username}</a>
         </Link>

			<ActionBtn action="Follow" classes="secondary-btn rounded-full" />
		</div>
	);
};

export default PinUserInfo;
