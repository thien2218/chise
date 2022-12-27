import { useState, useEffect } from "react";
import { useAuth, useDb } from "../../hooks";
import Button from "./Button";

const ActionBtn = ({ children, btnType, list, updateList, altText, req }) => {
	const {
		authUser: { username },
	} = useAuth();
	const originalState = list.contains(username);
	const [containsUser, setContainsUser] = useState(false);
   const { writeList } = useDb();

	const handleClick = (e) => {
		e.preventDefault();
		setContainsUser(!containsUser);
	};

	const debounce = (containsUser) => {
		let timeout;

		clearTimeout(timeout);
		timeout = setTimeout(async () => {
			if (containsUser != originalState) {
				await writeList(username, containsUser, req);
			}
		}, 3000);
	};

	useEffect(() => {
		if (req) {
			debounce(containsUser);
		} else {
			updateList(username, containsUser);
		}
	}, [containsUser]);

	if (containsUser) {
		return (
			<Button btnType="arbitrary-btn" onClick={handleClick}>
				{altText}
			</Button>
		);
	}

	return (
		<Button btnType={btnType} onClick={handleClick}>
			{children}
		</Button>
	);
};

export default ActionBtn;
