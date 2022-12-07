import { UserLayout } from "../../components";
import { withAuth } from "../../hooks";

const Saved = () => {
   return (
      <UserLayout />
   );
}

export default withAuth(Saved);