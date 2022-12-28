import { useState, useEffect, useCallback } from "react";
import { useAuth, useDb } from "../../hooks";
import Button from "./Button";

const ActionBtn = ({ children, btnType, list, altText, req }) => {
	const {
		authUser: { username },
	} = useAuth();
	const initState = list.includes(username);

	const [compareState, setCompareState] = useState(initState);
	const [containsUser, setContainsUser] = useState(initState);

	const { updateList } = useDb();

	const debounce = (cb, delay) => {
		let timeout;

		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => cb(...args), delay);
		};
	};

	const handleUpdate = async (containsUser) => {
		if (containsUser != compareState) {
			await updateList(username, containsUser, req);
			setCompareState(!compareState);
		}
	};

	const debounceUpdate = useCallback(debounce(handleUpdate, 2000), [compareState]);

	useEffect(() => {
		debounceUpdate(containsUser);
	}, [containsUser]);

	if (containsUser) {
		return (
			<Button
				btnType="arbitrary-btn"
				onClick={() => setContainsUser(!containsUser)}
			>
				{altText}
			</Button>
		);
	}

	return (
		<Button btnType={btnType} onClick={() => setContainsUser(!containsUser)}>
			{children}
		</Button>
	);
};

export default ActionBtn;
