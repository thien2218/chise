import { withAuth, useAuth } from "../hooks";
import { MasonryLayout, PrivateForm } from "../components";
import { Firestore } from "../services";

function Home({ pins }) {
	const { authUser } = useAuth();

	return (
		<>
			{authUser.isNewUser && <PrivateForm />}
			<MasonryLayout pins={pins} />
		</>
	);
}

export async function getServerSideProps() {
   const q = Firestore.queryPins();
	const pins = await Firestore.getPinsByQuery(q);

	return {
		props: {
			pins,
		},
	};
}

export default withAuth(Home);
