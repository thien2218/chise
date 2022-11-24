import { useState, useEffect, useContext, createContext } from "react";
import Auth from "../services/Auth";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);
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

	return (
      <UserContext.Provider value={{ authUser, setAuthUser }}>
         {children}
      </UserContext.Provider>
   );
};

export default UserProvider;
