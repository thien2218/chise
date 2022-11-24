import { withAuth } from "../hooks";

function Home() {
	return (
		<div>
			hello world
		</div>
	)
}

export default withAuth(Home);