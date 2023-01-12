import { useState, Children, cloneElement, isValidElement } from "react";
import { useDb, useLib } from "../../hooks";
import { useRouter } from "next/router";
import LinkBtn from "../common/LinkBtn";
import Button from "../common/Button";

const SettingsLayout = ({ children }) => {
	const { updateUser } = useDb();
   const { isEqual } = useLib();
   const [values, setValues] = useState({});
   const [isDifferent, setIsDifferent] = useState(false);
   const { pathname } = useRouter();

   const isPublicSettings = pathname === "/settings/public";
   const isPrivateSettings = pathname === "/settings/private";
   const isAccountSettings = pathname === "/settings/account";

   const navLinks = [
      {
         text: "Public profile",
         href: "/settings/public",
         isCurrPage: isPublicSettings,
      },
      {
         text: "Personal information",
         href: "/settings/private",
         isCurrPage: isPrivateSettings,
      },
      {
         text: "Account management",
         href: "/settings/account",
         isCurrPage: isAccountSettings,
      },
   ];

   const handleDiff = (initValues) => {
      if (!isEqual(values, initValues)) {
         setIsDifferent(true);
      } else {
         setIsDifferent(false);
      }
   }

	const childrenWithProps = Children.map(children, (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, { values, setValues, handleDiff });
		}
		return child;
	});

	return (
		<div className="grid md:grid-cols-[1fr_3fr] grid-cols-1 mt-10 px-5">
         <div className="flex flex-col">
            {navLinks.map(({ text, ...props }, id) => (
               <div className="max-w-max mb-6" key={id}>
                  <LinkBtn {...props}>
                     {text}
                  </LinkBtn>
               </div>
            ))}
         </div>

         <section className="max-w-[32rem]">
            {childrenWithProps}
         </section>

			<div className="h-16 w-full fixed z-10 bottom-0 left-0 shadow-[0_-1px_10px_-1px] shadow-black/10 bg-white flex-center gap-3">
            <Button btnType="disabled-btn" onClick={isDifferent ? handleDiff : () => {}}>
               Cancel
            </Button>
            <Button btnType="disabled-btn" onClick={isDifferent ? handleDiff : () => {}}>
               Save
            </Button>
         </div>
		</div>
	);
};

export default SettingsLayout;
