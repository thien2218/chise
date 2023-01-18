import { withAuth } from "../../../hooks";
import { SettingsLayout, AccManage } from "../../../components";

const Account = () => {
   return (
      <SettingsLayout>
         <AccManage />
      </SettingsLayout>
   )
}

export default withAuth(Account);