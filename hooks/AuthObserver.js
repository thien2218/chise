import { useEffect } from "react";
import Auth from "../services/Auth";
import { useAuth } from "./AuthProvider";
import { useValidation } from "./ValidationProvider";
import { Loader } from "../components";

const AuthObserver = ({ children }) => {
	const { setAuthUser, loading, setLoading } = useAuth();
   const { setAuthError } = useValidation();

	useEffect(() => {
		const unsubscribe = Auth.waitForUser((user) => {
         if (user) {
            setAuthUser(Auth.extractUserData(user));
            setAuthError({});
         }

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
