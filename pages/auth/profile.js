import { useDb, withoutProfile } from "../../hooks";
import { AuthLayout } from "../../components";

const Profile = () => {
   const fields = [
      {
         name: "username",
         label: "Username",
         type: "text",
         placeholder: "Create your username",
      },
      {
         name: "first_name",
         label: "First name",
         type: "text",
         placeholder: "Ex: Ada",
         optional: true,
      },
      {
         name: "last_name",
         label: "Last name",
         type: "text",
         placeholder: "Ex: Lovelace",
         optional: true,
      },
   ];
   const { addUser } = useDb();

   return (
      <AuthLayout fields={fields} submit={addUser} />
   )
}

export default withoutProfile(Profile);