import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../hooks";
import { IoSearch } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";

const Header = () => {
   const { logout } = useAuth();

	return (
		<header className="fixed w-full top-0 left-0 z-10">
			<nav className="flex h-16 items-center px-4 gap-3 bg-white">
				<Link href="/">
					<a className="flex items-center">
						<Image
							src="/assets/cat.jpg"
                     
							height={30}
							width={30}
							className="rounded-2xl"
						/>
						<span className="ml-1.5">CHISE</span>
					</a>
				</Link>

				<form className="flex-1 relative">
               <div className="absolute h-full px-4 flex items-center">
                  <IoSearch className="text-lg text-dark-gray" />
               </div>

					<input
						className="w-full px-10 py-2 rounded-lg input-bg"
						type="text"
						placeholder="Search..."
					/>
				</form>

            <Link href="/create">
               <a className="h-9 flex justify-center items-center aspect-square rounded-lg bg-black">
                  <HiPlus className="text-white text-lg" />
               </a>
            </Link>

            <button className="h-9" onClick={logout}>
               <Image
                  src="/assets/cat1.jpg"
                  height={36}
                  width={36}
                  className="rounded-lg"
               />
            </button>
			</nav>
		</header>
	);
};

export default Header;
