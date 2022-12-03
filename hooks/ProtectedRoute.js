import { useRouter } from "next/router";
import { useAuth } from "./AuthProvider";

export function withoutAuth(Components) {
   return function WithoutAuth(props) {
      const { authUser } = useAuth();
      const router = useRouter();

      if (authUser && authUser.username) {
         router.replace("/");
         return <div>Loading...</div>;
      } else if (authUser && !authUser.username) {
         router.replace("/auth/profile");
         return <div>Loading...</div>;
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
         return <div>Loading...</div>;
      } else if (!authUser) {
         router.replace("/auth/login");
         return <div>Loading...</div>;
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
         return <div>Loading...</div>;
      } else if (!authUser) {
         router.replace("/auth/login");
         return <div>Loading...</div>;
      }

      return <Components {...props} />
   }
}