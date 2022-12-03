import { PinBuilder } from "../components";
import { withAuth } from "../hooks";

const Create = () => {
   return (
      <PinBuilder />
   )
}

export default withAuth(Create);