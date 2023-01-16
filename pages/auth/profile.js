import { withoutProfile } from "../../hooks";
import { AuthLayout, ProfileForm } from "../../components";

const Profile = () => {
   const fields = [
      {
         name: "username",
         label: "Username",
         type: "text",
         placeholder: "Create your username",
      },
      {
         name: "name",
         label: "Name",
         type: "text",
         placeholder: "Ex: Ada Lovelace",
      },
   ];

   return (
      <AuthLayout>
         <ProfileForm fields={fields} />
      </AuthLayout>
   )
}

export default withoutProfile(Profile);