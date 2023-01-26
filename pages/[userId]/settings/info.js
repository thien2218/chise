import { withAuth } from "../../../hooks";
import { SettingsLayout, PublicInfo, PrivateInfo } from "../../../components";
import { Firestore } from "../../../services";

const Info = ({ user }) => {
	return (
		<SettingsLayout>
			<PublicInfo user={user} />
			<PrivateInfo />
		</SettingsLayout>
	);
};

export async function getServerSideProps({ params: { userId } }) {
	const user = await Firestore.getUser(userId);
	const returnData = { props: { user } };
	return returnData;
}

export default withAuth(Info);
