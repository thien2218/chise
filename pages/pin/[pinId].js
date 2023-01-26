import { PinLayout } from "../../components";
import { Firestore } from "../../services";
import { withAuth } from "../../hooks";

const PinContent = ({ pinData, pins }) => {
	return <PinLayout pinData={pinData} pins={pins} />;
};

export async function getStaticPaths() {
	const pins = await Firestore.getPinsByQuery();

	const paths = pins.map((pin) => ({
		params: { pinId: pin.id },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params: { pinId } }) {
	let pinData;
	const pins = (await Firestore.getPinsByQuery()).filter(
		(data) => {
         if (data.id === pinId) {
            pinData = data;
         }
         return data.id != pinId;
      }
	);

	return {
		props: { pinData, pins },
		revalidate: 180,
	};
}

export default withAuth(PinContent);
