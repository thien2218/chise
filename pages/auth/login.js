import { AuthLayout, AuthForm } from "../../components";
import { useAuth, withoutAuth } from "../../hooks";

const Login = () => {
   const msgs = {
      email: "Invalid email pattern",
      password: "Password must contain between 6 to 20 characters",
   }

   const fields = [
      {
         name: "email",
         label: "Email",
         type: "email",
         placeholder: "Enter your email",
      },
      {
         name: "password",
         label: "Password",
         type: "password",
         placeholder: "Enter your password",
      },
   ];

   const { login } = useAuth();

   return (
      <AuthLayout >
         <AuthForm fields={fields} submit={login} msgs={msgs} />
      </AuthLayout>
   )
}

export default withoutAuth(Login);