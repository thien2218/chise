import { Children, cloneElement, isValidElement } from "react";
import { useDb } from "../../hooks";
import { useRouter } from "next/router";

const SettingsLayout = ({ children }) => {
	const { updateUser } = useDb();
   const { pathname } = useRouter();

   const isPublicSettings = pathname === "/settings/public";
   const isPrivateSettings = pathname === "/settings/private";
   const isAccountSettings = pathname === "/settings/account";

	const childrenWithProps = Children.map(children, (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, { updateUser });
		}
		return child;
	});

	return (
		<div className="grid sm:grid-cols-[1fr_32rem_1.5fr] grid-cols-1 mt-5 px-5 min-h-screen">
			{childrenWithProps}
			<div className="h-16 w-full fixed z-10 bottom-0 left-0 shadow-[0_-1px_10px_-1px] shadow-black/10 bg-white flex-center"></div>
		</div>
	);
};

export default SettingsLayout;
