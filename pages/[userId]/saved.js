import { UserLayout } from "../../components";
import { withAuth } from "../../hooks";
import { Firestore } from "../../services";

const Saved = ({ user, pins }) => {
	return <UserLayout user={user} pins={pins} />;
};

export async function getServerSideProps({ params: { userId } }) {
	const user = await Firestore.getUser(userId);
   
   const q = Firestore.queryPinsSavedBy(userId);
   const pins = await Firestore.getPinsByQuery(q);

	return {
		props: { user, pins },
	};
}

export default withAuth(Saved);
