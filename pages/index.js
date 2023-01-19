import { useState } from "react";
import { withAuth, useAuth } from "../hooks";
import { MasonryLayout, PrivateForm } from "../components";
import { Firestore } from "../services";

const Home = ({ pins }) => {
   const [currPins, setCurrPins] = useState(pins);
	const { authUser } = useAuth();

	return (
		<>
			{authUser.isNewUser ? <PrivateForm /> : null}
			<MasonryLayout pins={currPins} setPins={setCurrPins} />
		</>
	);
};

export async function getServerSideProps() {
	const pins = await Firestore.getPinsByQuery();

	return {
		props: {
			pins,
		},
	};
}

export default withAuth(Home);
