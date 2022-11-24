import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../hooks";

const Header = () => {
   const { logout } = useAuth();

	return (
		<header className="fixed w-full top-0 left-0">
			<nav className="flex h-[5rem] items-center px-4 gap-4 bg-white">
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
					<input
						className="w-full px-10 py-3 rounded-2xl input-bg"
						type="text"
						placeholder="Search..."
					/>
				</form>

            <Link href="/create-pin">
               <a className="p-0.5 rounded-2xl bg-black"></a>
            </Link>

            <button className="h-[30px]" onClick={logout}>
               <Image
                  src="/assets/cat1.jpg"
                  height={30}
                  width={30}
                  className="rounded-2xl"
               />
            </button>
			</nav>
		</header>
	);
};

export default Header;
