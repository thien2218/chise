import { withAuth, useAuth } from "../hooks";
import { MasonryLayout, PrivateForm } from "../components";
import { Firestore } from "../services";

function Home({ pins }) {
	const { authUser } = useAuth();

	return (
		<>
			{authUser.isNewUser ? <PrivateForm /> : null}
			<MasonryLayout pins={pins} />
		</>
	);
}

export async function getServerSideProps() {
	const pins = await Firestore.getPinsByQuery();

	return {
		props: {
			pins,
		},
	};
}

export default withAuth(Home);
