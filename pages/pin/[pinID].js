import { PinLayout } from "../../components";
import { Firestore } from "../../services";
import { withAuth } from "../../hooks";

const PinContent = ({ pinData, pins }) => {
	return <PinLayout pinData={pinData} pins={pins} />;
};

export async function getStaticPaths() {
	const pins = await Firestore.getPins();

	const paths = pins.map((pin) => ({
		params: { pinID: pin.id },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const pinData = await Firestore.getPin(params.pinID);
	const pins = await Firestore.getPinsExclude(params.pinID);

	return {
		props: { pinData, pins },
		revalidate: 180,
	};
}

export default withAuth(PinContent);
