import { withAuth } from "../../hooks";
import { SettingsLayout, PrivateInfo } from "../../components";

const Private = () => {
	return (
		<SettingsLayout>
			<PrivateInfo />
		</SettingsLayout>
	);
};

export default withAuth(Private);
