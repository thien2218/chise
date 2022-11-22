import { AuthLayout } from "../../components";
import { useAuth, withoutAuth } from "../../hooks";

const Login = () => {
   const fields = [
      {
         name: "email",
         label: "Email",
         type: "text",
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
      <AuthLayout fields={fields} submit={login} />
   )
}

export default withoutAuth(Login);