import { withAuth } from "../hooks";
import { MasonryLayout } from "../components";
import { Firestore } from "../services";

function Home({ pins }) {
	return (
		<MasonryLayout />
	)
}

// export async function getServerSideProps() {
//    const pins = await Firestore.getPins();

//    return {
//       props: {
//          pins,
//       },
//    };
// }

export default withAuth(Home);