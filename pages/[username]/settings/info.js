import { withAuth } from "../../../hooks";
import { SettingsLayout, PublicInfo, PrivateInfo } from "../../../components";
import { Firestore } from "../../../services";

const Info = ({ user }) => {
	return (
		<SettingsLayout username={user.username}>
			<PublicInfo user={user} />
			<PrivateInfo />
		</SettingsLayout>
	);
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

	return {
		props: { user },
		revalidate: 120,
	};
}

export default withAuth(Info);
