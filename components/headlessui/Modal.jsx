import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({
	children,
	title,
	maxW,
	customProps,
	dialogChild: DialogChild,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className="relative z-[9]" onClick={() => setIsOpen(true)}>
				{children}
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setIsOpen(false)}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center px-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel
									className={`w-full ${maxW} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
								>
									<Dialog.Title
										as="h3"
										className="text-[28px] leading-tight text-center font-medium text-secondary"
									>
										{title}
									</Dialog.Title>

									<DialogChild
										setIsOpen={setIsOpen}
										{...customProps}
									/>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Modal;
