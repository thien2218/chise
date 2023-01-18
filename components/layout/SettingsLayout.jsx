import { useState, Children, cloneElement, isValidElement, useEffect } from "react";
import { useDb, useLib, useValidation } from "../../hooks";
import { useRouter } from "next/router";
import LinkBtn from "../common/LinkBtn";
import Button from "../common/Button";

const SettingsLayout = ({ children, username }) => {
	const { updateUser, uploadImg } = useDb();
	const { isEqual } = useLib();
   const { checkErrors } = useValidation();
	const [values, setValues] = useState({});
   const [initObj, setInitObj] = useState({});
   const [error, setError] = useState({});
	const [clickable, setClickable] = useState(false);
	const { pathname } = useRouter();

   useEffect(() => {
		if (isEqual(values, initObj) || checkErrors(error)) {
			setClickable(false);
		} else {
			setClickable(true);
		}
   }, [values, initObj, error]);

	const isInfoSettings = pathname === "/[username]/settings/info";
	const isAccountSettings = pathname === "/[username]/settings/account";

	const navLinks = [
		{
			text: "Your profile",
			href: `/${username}/settings/info`,
			isCurrPage: isInfoSettings,
		},
		{
			text: "Account management",
			href: `/${username}/settings/account`,
			isCurrPage: isAccountSettings,
		},
	];

	const handleSubmit = async () => {
      if (values.imgFile) {
         const { imgFile, imgRatio, ...rest } = values;
         rest.profileUrl = await uploadImg(imgFile, "profile");
         values = rest;
      }
      const { username, ...otherValues } = values;

      await updateUser(username, otherValues);
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
			<div className="flex flex-col">
				{navLinks.map(({ text, ...props }, id) => (
					<div className="max-w-max mb-6" key={id}>
						<LinkBtn {...props}>{text}</LinkBtn>
					</div>
				))}
			</div>

			<section className="max-w-[32rem]">{childrenWithProps}</section>

			<div className="h-16 w-full fixed z-10 bottom-0 left-0 shadow-[0_-1px_10px_-1px] shadow-black/10 bg-white flex-center gap-3">
				<Button
					btnType={`${clickable ? "secondary-btn" : "disabled-btn"}`}
					onClick={clickable ? handleCancel : () => {}}
               noAsync
				>
					Cancel
				</Button>

				<Button
					btnType={`${clickable ? "primary-btn" : "disabled-btn"}`}
					onClick={clickable ? handleSubmit : () => {}}
				>
					Save
				</Button>
			</div>
		</div>
	);
};

export default SettingsLayout;
