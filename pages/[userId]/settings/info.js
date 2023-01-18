import { withAuth } from "../../../hooks";
import { SettingsLayout, PublicInfo, PrivateInfo } from "../../../components";
import { Firestore } from "../../../services";

const Info = ({ user }) => {
   const info = {
      username: user.username,
      name: user.name,
      profileUrl: user.profileUrl,
      about: user.about,
      privateInfo: user.privateInfo,
   }

	return (
		<SettingsLayout>
			<PublicInfo info={info} />
			<PrivateInfo />
		</SettingsLayout>
	);
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

	return {
		props: { user },
		revalidate: 120,
	};
}

export default withAuth(Info);
