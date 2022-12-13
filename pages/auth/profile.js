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
         name: "about",
         label: "About (optional)",
         type: "text",
         placeholder: "Tell us about you",
         optional: true,
      },
   ];
   const { addUser } = useDb();

   return (
      <AuthLayout fields={fields} submit={addUser} />
   )
}

export default withoutProfile(Profile);