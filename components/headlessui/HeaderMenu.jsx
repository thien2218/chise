import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { useAuth } from "../../hooks";

const HeaderMenu = ({ children }) => {
	const { logout, authUser } = useAuth();

	return (
		<Menu>
			<Menu.Button>{children}</Menu.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 top-12 translate-y-2 -translate-x-2 w-44 rounded-lg shadow-[0_0_15px_-2px_rgb(0_0_0/.1)]">
					<div className="p-2 flex flex-col bg-white">
                  <div className="p-2">
                     <span className="block text-lg font-medium">{authUser?.name}</span>
                     <span className="block text-xs text-gray-400">@{authUser?.username}</span>
                  </div>
						<Link href={`/${authUser?.username}/created`}>
							<Menu.Item>
								{({ active }) => (
									<a
										className={`${
											active ? "bg-dimmed-500" : "bg-white"
										} cursor-pointer rounded px-2 py-1.5`}
									>
										My profile
									</a>
								)}
							</Menu.Item>
						</Link>

						<Link href={`/${authUser?.username}/settings/info`}>
							<Menu.Item>
								{({ active }) => (
									<a
										className={`${
											active ? "bg-dimmed-500" : "bg-white"
										} cursor-pointer rounded px-2 py-1.5`}
									>
										Account settings
									</a>
								)}
							</Menu.Item>
						</Link>

						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active ? "bg-dimmed-500" : "bg-white"
									} text-primary text-left rounded px-2 py-1.5`}
									onClick={logout}
								>
									Log out
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default HeaderMenu;
