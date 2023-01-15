import { PinBuilderLayout } from "../components";
import { withAuth } from "../hooks";

const Create = () => {
   return (
      <PinBuilderLayout />
   )
}

export default withAuth(Create);