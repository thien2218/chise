import { withAuth } from "../../hooks";
import { SettingsLayout, PrivateInfo } from "../../components";

const Private = () => {
  return (
    <div>Private</div>
  )
}

export default withAuth(Private);