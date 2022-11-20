import { AuthLayout } from "../components";
import { useAuth } from "../hooks"

const Login = () => {
   const fields = [
      {
         name: "username",
         lable: "Username",
         type: "text",
         placeholder: "Enter your username",
      },
      {
         name: "password",
         lable: "Password",
         type: "text",
         placeholder: "Enter your password",
      },
   ];

   const { login } = useAuth();

   return (
      <AuthLayout fields={fields} submit={login} />
   )
}

export default Login