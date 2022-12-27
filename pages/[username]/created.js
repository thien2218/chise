import { UserLayout } from "../../components";
import { withAuth } from "../../hooks";
import { Firestore } from "../../services";

const Created = ({ user }) => {
	return <UserLayout user={user} />;
};

export async function getServerSideProps({ params }) {
	const user = await Firestore.getUser(params.username);

	return {
		props: { user },
	};
}

export default withAuth(Created);
