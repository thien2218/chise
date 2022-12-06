import { useState, useEffect } from "react";
import Auth from "../services/Auth";
import { useAuth } from "./AuthProvider";
import { Loader } from "../components";

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
		return <Loader />;
	}

	return children;
};

export default AuthObserver;
