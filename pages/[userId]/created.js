import { UserLayout } from "../../components";
import { withAuth } from "../../hooks";
import { Firestore } from "../../services";

const Created = ({ user, pins }) => {
	return <UserLayout user={user} pins={pins} />;
};

export async function getServerSideProps({ params: { userId } }) {
	const user = await Firestore.getUser(userId);
   
   const q = Firestore.queryPinsCreatedBy(userId);
   const pins = await Firestore.getPinsByQuery(q);

	return {
		props: { user, pins },
	};
}

export default withAuth(Created);
