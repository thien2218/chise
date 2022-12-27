import { PinLayout } from "../../components";
import { Firestore } from "../../services";

const PinContent = ({ pinData }) => {
	return <PinLayout pinData={pinData} />;
};

export async function getStaticPaths() {
	const pins = await Firestore.getPins();

	const paths = pins.map((pin) => ({
		params: { pinID: pin.id },
	}));

	return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
	const pinData = await Firestore.getPin(params.pinID);

	return {
		props: { pinData },
		revalidate: 600,
	};
}

export default PinContent;
