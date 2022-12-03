import { useState, useEffect } from "react";
import Auth from "../services/Auth";
import { useAuth } from "./AuthProvider";

const AuthObserver = ({ children }) => {
	const { setAuthUser } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = Auth.waitForUser((user) => {
			setAuthUser(user ? Auth.extractUserData(user) : null);
			setLoading(false);
		});

      return unsubscribe;
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return children;
};

export default AuthObserver;
