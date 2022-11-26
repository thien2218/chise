import { withAuth } from "../hooks";
import { MasonryLayout } from "../components";

function Home() {
	return (
		<MasonryLayout />
	)
}

export default withAuth(Home);