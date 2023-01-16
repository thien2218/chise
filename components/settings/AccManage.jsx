import TextField from "../common/TextField";
import { useEffect } from "react";
import Button from "../common/Button";
import { useDb } from "../../hooks";

const AccManage = ({ authUser, values, setValues, setInitObj }) => {
	useEffect(() => {
      const initObj = {
         email: authUser.email,
      }
      
		setValues(initObj);
		setInitObj(initObj);
	}, []);

   const { deleteUser } = useDb();

	return (
		<div className="min-h-[50rem]">
			<h1 className="text-3xl font-medium">Account management</h1>
			<h2 className="mt-2 text-dark-gray">
				Make changes to your email address and password. This information is
				also private and will not be visible in your public profile.
			</h2>

			<h3 className="text-xl font-medium my-5">Change your email address</h3>
			<TextField
				name="email"
				label="Email"
				type="text"
				defaultVal={values.email}
				handleBlur={() => {}}
				handleChange={() => {}}
				handleFocus={() => {}}
			/>

			<h3 className="text-xl font-medium my-5">Change your password</h3>
			<div className="grid grid-cols-2 gap-3">
				<TextField
					name="password"
					label="Old password"
					type="text"
					defaultVal={""}
					handleBlur={() => {}}
					handleChange={() => {}}
					handleFocus={() => {}}
				/>

				<TextField
					name="password"
					label="New password"
					type="text"
					defaultVal={""}
					handleBlur={() => {}}
					handleChange={() => {}}
					handleFocus={() => {}}
				/>

				<div className="flex justify-end col-start-2">
					<Button btnType="secondary-btn" onClick={() => {}}>
						Change password
					</Button>
				</div>
			</div>

			<h3 className="text-xl font-medium my-5 text-primary">Danger zone</h3>
			<div className="flex items-center justify-between mb-10">
				<div>
					<h4 className="font-medium mb-2">Deactivate account</h4>
					<span className="font-light">Hide your Pins and profile</span>
				</div>

				<Button btnType="secondary-btn" onClick={() => {}}>
					Deactivate account
				</Button>
			</div>
			<div className="flex items-center justify-between">
				<div>
					<h4 className="font-medium mb-2">
						Delete your data and account
					</h4>
					<span className="font-light">
						Delete your account and account data
					</span>
				</div>

				<Button btnType="warning-btn">
					Delete account
				</Button>
			</div>
		</div>
	);
};

export default AccManage;
