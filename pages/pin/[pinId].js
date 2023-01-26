import { PinLayout } from "../../components";
import { Firestore } from "../../services";
import { withAuth } from "../../hooks";

const PinContent = ({ pinData, pins }) => {
	return <PinLayout pinData={pinData} pins={pins} />;
};

export async function getServerSideProps({ params: { pinId } }) {
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
	};
}

export default withAuth(PinContent);
