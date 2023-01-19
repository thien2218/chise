import {
	useState,
	Children,
	cloneElement,
	isValidElement,
	useEffect,
} from "react";
import { useDb, useLib, useValidation, useAuth } from "../../hooks";
import { useRouter } from "next/router";
import LinkBtn from "../common/LinkBtn";
import Button from "../common/Button";
import Modal from "../headlessui/Modal";

const SettingsLayout = ({ children }) => {
	const [values, setValues] = useState({});
	const [initObj, setInitObj] = useState({});
	const [error, setError] = useState({});
	const [clickable, setClickable] = useState(false);

	const { pathname } = useRouter();
	const { updateUser, uploadImg } = useDb();
	const { isEqual } = useLib();
	const { checkErrors } = useValidation();
	const {
		authUser: { id },
	} = useAuth();

	useEffect(() => {
		if (isEqual(values, initObj) || checkErrors(error)) {
			setClickable(false);
		} else {
			setClickable(true);
		}
	}, [values, initObj, error]);

	const isInfoSettings = pathname === "/[userId]/settings/info";
	const isAccountSettings = pathname === "/[userId]/settings/account";

	const navLinks = [
		{
			text: "Your profile",
			href: `/${id}/settings/info`,
			isCurrPage: isInfoSettings,
		},
		{
			text: "Account management",
			href: `/${id}/settings/account`,
			isCurrPage: isAccountSettings,
		},
	];

	const confirmText = {
		reset: {
			title: "Are you sure?",
			description:
				"Any changes you've made so far will be lost and reverted to original state",
		},
		update: {
			title: "Apply these changes",
			description:
				"Once confirmed, you'll have to wait for 1 - 2 minutes before the changes are applied",
		},
	};

	const handleSubmit = async () => {
		if (values.imgFile) {
			const { imgFile, imgRatio, ...rest } = values;
			rest.profileUrl = await uploadImg(imgFile, "profile");
			values = rest;
		}

		setInitObj(values);
		await updateUser(id, values);
	};

	const handleCancel = () => {
		setValues(initObj);
	};

	const childrenWithProps = Children.map(children, (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, {
				values,
				setValues,
				setInitObj,
				error,
				setError,
			});
		}
		return child;
	});

	return (
		<div className="grid md:grid-cols-[1fr_3fr] grid-cols-1 mt-10 px-5">
			<div className="md:fixed left-5 flex flex-col">
				{navLinks.map(({ text, ...props }, id) => (
					<div className="max-w-max mb-6" key={id}>
						<LinkBtn {...props}>{text}</LinkBtn>
					</div>
				))}
			</div>

			<section className="max-w-[32rem] md:col-start-2">
				{childrenWithProps}
			</section>

			<div className="h-16 w-full fixed z-10 bottom-0 left-0 shadow-[0_-1px_10px_-1px] shadow-black/10 bg-white flex-center gap-3">
				<Modal
					{...confirmText.reset}
					noAsyncConfirm
					handleConfirm={handleCancel}
				>
					<Button
						btnType={`${clickable ? "secondary-btn" : "disabled-btn"}`}
						onClick={() => {}}
						noAsync
					>
						Reset
					</Button>
				</Modal>

				<Modal {...confirmText.update} handleConfirm={handleSubmit}>
					<Button
						btnType={`${clickable ? "primary-btn" : "disabled-btn"}`}
						onClick={() => {}}
						noAsync
					>
						Save
					</Button>
				</Modal>
			</div>
		</div>
	);
};

export default SettingsLayout;
