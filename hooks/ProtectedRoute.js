import { useRouter } from "next/router";
import { useAuth } from "./AuthProvider";
import { Loader } from "../components";

export function withoutAuth(Components) {
   return function WithoutAuth(props) {
      const { authUser } = useAuth();
      const router = useRouter();

      if (authUser && authUser.username) {
         router.replace("/");
         return <Loader />;
      } else if (authUser && !authUser.username) {
         router.replace("/auth/profile");
         return <Loader />;
      }

      return <Components {...props} />
   }
}

export function withoutProfile(Components) {
   return function WithoutProfile(props) {
      const { authUser } = useAuth();
      const router = useRouter();

      if (authUser && authUser.username) {
         router.replace("/");
         return <Loader />;
      } else if (!authUser) {
         router.replace("/auth/login");
         return <Loader />;
      }

      return <Components {...props} />
   }
}

export function withAuth(Components) {
   return function WithAuth(props) {
      const { authUser } = useAuth();
      const router = useRouter();

      if (authUser && !authUser.username) {
         router.replace("/auth/profile");
         return <Loader />;
      } else if (!authUser) {
         router.replace("/auth/login");
         return <Loader />;
      }

      return <Components {...props} />
   }
}