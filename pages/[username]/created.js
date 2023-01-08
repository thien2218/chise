import { UserLayout } from "../../components";
import { withAuth } from "../../hooks";
import { Firestore } from "../../services";

const Created = ({ user, pins }) => {
	return <UserLayout user={user} pins={pins} />;
};

export async function getStaticPaths() {
	const users = await Firestore.getUsers();

	const paths = users.map((user) => ({
		params: { username: user.username },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params: { username } }) {
	const user = await Firestore.getUser(username);
   const q = Firestore.queryPinsCreatedBy(username);
   const pins = await Firestore.getPinsByQuery(q);

	return {
		props: { user, pins },
		revalidate: 10,
	};
}

export default withAuth(Created);
