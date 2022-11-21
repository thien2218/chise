import { useState, useEffect } from "react";
import Auth from "../services/Auth";

const AuthObserver = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Auth.waitForUser((user) => {
			setAuthUser(Auth.extractUserData(user));
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return children;
};

export default AuthObserver;
