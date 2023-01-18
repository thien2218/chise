import { UserLayout } from "../../components";
import { withAuth } from "../../hooks";
import { Firestore } from "../../services";

const Saved = ({ user, pins }) => {
	return <UserLayout user={user} pins={pins} />;
};

export async function getStaticPaths() {
	const ids = await Firestore.getUserIds();

	const paths = ids.map((userId) => ({
		params: { userId },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params: { userId } }) {
	const user = await Firestore.getUser(userId);
   
   const q = Firestore.queryPinsSavedBy(userId);
   const pins = await Firestore.getPinsByQuery(q);

	return {
		props: { user, pins },
		revalidate: 10,
	};
}

export default withAuth(Saved);
