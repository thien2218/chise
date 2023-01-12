import { withAuth } from "../../hooks";
import { SettingsLayout, PublicInfo } from "../../components";

const Public = () => {
	return (
		<SettingsLayout>
			<PublicInfo />
		</SettingsLayout>
	);
};

export default withAuth(Public);
