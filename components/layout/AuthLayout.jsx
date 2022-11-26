import AuthForm from "../auth/AuthForm";

const AuthLayout = ({ fields, submit }) => {
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

			<div className="absolute top-0 right-0 left-0 bottom-0 grid lg:grid-cols-2 bg-black/50">
				<div className="flex justify-center items-center">
					<h1 className="text-[3.5rem] leading-[4rem] font-semibold text-white max-w-[20rem] lg:text-left text-center">
						New ideas made to be shared
					</h1>
				</div>
            
				<div className="flex justify-center items-center">
					<AuthForm fields={fields} submit={submit} />
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
