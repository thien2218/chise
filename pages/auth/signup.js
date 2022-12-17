import { AuthLayout, AuthForm } from "../../components";
import { useAuth, withoutAuth } from "../../hooks";

const Signup = () => {
   const msgs = {
      email: "Invalid email pattern",
      password: "Password must contain between 6 to 20 characters",
      confirm_password: "Password confirmation does not match",
   }

   const fields = [
      {
         name: "email",
         label: "Email",
         type: "email",
         placeholder: "example@domain.com",
      },
      {
         name: "password",
         label: "Password",
         type: "password",
         placeholder: "Create a password",
      },
      {
         name: "confirm_password",
         label: "Confirm password",
         type: "password",
         placeholder: "Re-enter your password",
      },
   ];

   const { signup } = useAuth();

   return (
      <AuthLayout>
         <AuthForm fields={fields} submit={signup} msgs={msgs} />
      </AuthLayout>
   )
}

export default withoutAuth(Signup);