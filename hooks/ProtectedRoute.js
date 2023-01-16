import { useRouter } from "next/router";
import { useAuth } from "./AuthProvider";
import { SpinLoader } from "../components";

export function withoutAuth(Components) {
	return function WithoutAuth(props) {
		const { authUser } = useAuth();
		const haveName = authUser?.username && authUser?.name;
		const router = useRouter();

		if (authUser && haveName) {
			router.replace("/");
			return <SpinLoader />;
		} else if (authUser && !haveName) {
			router.replace("/auth/profile");
			return <SpinLoader />;
		}

		return <Components {...props} />;
	};
}

export function withoutProfile(Components) {
	return function WithoutProfile(props) {
		const { authUser } = useAuth();
		const haveName = authUser?.username && authUser?.name;
		const router = useRouter();

		if (authUser && haveName) {
			router.replace("/");
			return <SpinLoader />;
		} else if (!authUser) {
			router.replace("/auth/login");
			return <SpinLoader />;
		}

		return <Components {...props} />;
	};
}

export function withAuth(Components) {
	return function WithAuth(props) {
		const { authUser } = useAuth();
		const haveName = authUser?.username && authUser?.name;
		const router = useRouter();

		if (authUser && !haveName) {
			router.replace("/auth/profile");
			return <SpinLoader />;
		} else if (!authUser) {
			router.replace("/auth/login");
			return <SpinLoader />;
		}

		return <Components {...props} />;
	};
}
