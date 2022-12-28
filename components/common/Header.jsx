import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../hooks";
import { IoSearch } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";
import Avvvatars from "avvvatars-react";

const Logo = () => {
	return (
		<svg
			width="70"
			height="21"
			viewBox="0 0 70 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M10.08 0.44C11.96 0.44 13.65 0.829999 15.15 1.61L14.43 5L14.1 5.15C13.5 4.73 12.84 4.4 12.12 4.16C11.4 3.92 10.66 3.8 9.9 3.8C6.72 3.8 5.13 5.89 5.13 10.07C5.13 12.33 5.54 14.03 6.36 15.17C7.2 16.29 8.42 16.85 10.02 16.85C10.76 16.85 11.52 16.74 12.3 16.52C13.1 16.28 13.82 15.96 14.46 15.56L14.82 15.77L14.49 19.22C12.97 19.92 11.37 20.27 9.69 20.27C6.81 20.27 4.61 19.43 3.09 17.75C1.59 16.07 0.84 13.66 0.84 10.52C0.84 7.32 1.64 4.84 3.24 3.08C4.86 1.32 7.14 0.44 10.08 0.44ZM50.5324 0.44C52.1724 0.44 53.8024 0.77 55.4224 1.43L54.7624 4.94L54.1624 5.18C53.4824 4.7 52.7724 4.32 52.0324 4.04C51.3124 3.76 50.6524 3.62 50.0524 3.62C49.2524 3.62 48.6124 3.84 48.1324 4.28C47.6524 4.7 47.4124 5.19 47.4124 5.75C47.4124 6.33 47.6724 6.82 48.1924 7.22C48.7324 7.62 49.5724 8.09 50.7124 8.63C51.8124 9.13 52.7024 9.6 53.3824 10.04C54.0824 10.46 54.6724 11.02 55.1524 11.72C55.6524 12.42 55.9024 13.28 55.9024 14.3C55.9024 15.4 55.6024 16.41 55.0024 17.33C54.4024 18.23 53.5524 18.95 52.4524 19.49C51.3524 20.01 50.0824 20.27 48.6424 20.27C46.7424 20.27 44.8324 19.86 42.9124 19.04L43.4824 15.26L43.9324 15.02C44.7324 15.72 45.6024 16.26 46.5424 16.64C47.5024 17 48.3524 17.18 49.0924 17.18C49.9724 17.18 50.6524 16.97 51.1324 16.55C51.6324 16.11 51.8824 15.59 51.8824 14.99C51.8824 14.35 51.6124 13.83 51.0724 13.43C50.5524 13.03 49.7024 12.55 48.5224 11.99C47.4424 11.51 46.5624 11.06 45.8824 10.64C45.2024 10.22 44.6224 9.66 44.1424 8.96C43.6624 8.26 43.4224 7.41 43.4224 6.41C43.4224 5.29 43.7224 4.28 44.3224 3.38C44.9224 2.46 45.7624 1.74 46.8424 1.22C47.9224 0.699999 49.1524 0.44 50.5324 0.44Z"
				fill="#E60023"
			/>
			<path
				d="M31.278 15.14L31.428 20H27.648L27.798 15.5L27.768 14.03L24.378 14L21.348 14.06L21.318 15.14L21.468 20H17.688L17.838 15.5L17.688 4.85H21.528L21.408 10.85L24.618 10.91L27.738 10.88L27.648 4.85H31.488L31.278 15.14ZM39.4235 15.14L39.5735 20H35.7935L35.9435 15.5L35.7935 4.85H39.6335L39.4235 15.14ZM69.5238 16.94L69.7638 17.18L69.4938 20H59.1138L59.2638 15.5L59.1138 4.85H69.6438L69.8538 5.15L69.6138 7.94L65.7138 7.79H62.8938L62.8338 10.85L65.5338 10.88L68.1438 10.79L68.3538 11.06L68.1138 13.91L65.2638 13.82H62.7738L62.7438 15.14L62.8038 17.06H65.4438L69.5238 16.94Z"
				fill="black"
			/>
		</svg>
	);
};

const Header = () => {
	const { authUser, logout } = useAuth();

	return (
		<header className="fixed w-full top-0 left-0 z-10">
			<nav className="flex h-16 items-center px-4 gap-2 bg-white">
				<Link href="/">
					<a className="flex items-center mr-1">
						<Logo />
					</a>
				</Link>

				<form className="flex-1 relative">
					<div className="absolute h-full px-4 flex items-center">
						<IoSearch className="text-lg text-dark-gray" />
					</div>

					<input
						className="w-full px-10 py-2.5 rounded-full input-bg"
						type="text"
						placeholder="Search..."
					/>
				</form>

				<div className="flex">
					<Link href="/create">
						<a className="h-11 flex-center aspect-square rounded-full hover:bg-dimmed-600">
							<div className="rounded-full h-8 aspect-square flex-center bg-secondary">
								<HiPlus className="text-white text-lg" />
							</div>
						</a>
					</Link>

					<div
						className="h-11 cursor-pointer aspect-square rounded-full flex-center hover:bg-dimmed-600"
						onClick={logout}
					>
						{authUser?.profileUrl ? (
							<Image
								src={authUser.profileUrl}
								height={32}
								width={32}
								className="rounded-full"
                        priority
							/>
						) : (
							<Avvvatars size={32} value={authUser?.name} />
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
