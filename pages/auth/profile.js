import { useDb, withoutProfile } from "../../hooks";
import { AuthLayout, ProfileForm } from "../../components";

const Profile = () => {
   const msgs = {
      username: {
         lengthBetween: "Username must contain between 3 to 20 characters",
         textDigitOnly: "Username can only contain text or digits",
      },
      name: "Name mustn't contain any of these characters: @#$^*-+=|\"`\\<>[]{}"
   }

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
         <ProfileForm fields={fields} msgs={msgs} />
      </AuthLayout>
   )
}

export default withoutProfile(Profile);