import { PinLayout } from "../../components";
import { Firestore } from "../../services";
import { withAuth } from "../../hooks";

const PinContent = ({ pinData, pins }) => {
	return <PinLayout pinData={pinData} pins={pins} />;
};

export async function getStaticPaths() {
   const q = Firestore.queryPins();
	const pins = await Firestore.getPinsByQuery(q);

	const paths = pins.map((pin) => ({
		params: { pinID: pin.id },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params: { pinID } }) {
   const q = Firestore.queryPinsExcept(pinID);
	const pins = await Firestore.getPinsByQuery(q);
	const pinData = await Firestore.getPin(pinID);

	return {
		props: { pinData, pins },
		revalidate: 180,
	};
}

export default withAuth(PinContent);
