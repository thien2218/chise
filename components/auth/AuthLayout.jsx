import { useRouter } from "next/router";

const AuthLayout = ({ children }) => {
	const { pathname } = useRouter();
	const isProfilePage = pathname === "/auth/profile";

	return (
		<div className="h-screen w-screen relative">
			<video
				src="/assets/chise.mp4"
				type="video/mp4"
				loop
				controls={false}
				autoPlay
				muted
				className="w-full h-full object-cover"
			/>

			<div
				className={`absolute top-0 right-0 left-0 bottom-0 grid ${
					!isProfilePage && "md:grid-cols-2"
				} bg-black/50`}
			>
				{!isProfilePage && (
					<div className="flex-center">
						<h1 className="md:text-[3.5rem] text-[3rem] md:leading-[4rem] leading-[3.5rem] font-semibold text-white max-w-[20rem] md:text-left text-center">
							New ideas made to be shared
						</h1>
					</div>
				)}

				<div className="flex-center pt-4">{children}</div>
			</div>
		</div>
	);
};

export default AuthLayout;
