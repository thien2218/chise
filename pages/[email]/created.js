import { UserLayout } from "../../components";
import { withAuth } from "../../hooks";

const Created = () => {
   return (
      <UserLayout />
   );
}

export default withAuth(Created);