import { withAuth } from "../../hooks";
import { SettingsLayout, PublicInfo } from "../../components";

const Public = () => {
	return <div>Public</div>;
};

export default withAuth(Public);
