import { useUser } from "./UserProvider";
import { useRouter } from "next/router";

export function withoutAuth(Components) {
   return function WithoutAuth(props) {
      const { authUser } = useUser();
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

export function withoutProfile() {
   return function WithoutProfile(props) {
      const { authUser } = useUser();
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

export function withAuth() {
   return function WithAuth(props) {
      const { authUser } = useUser();
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