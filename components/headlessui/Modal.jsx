import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../common/Button";

const Modal = ({
	children,
	handleConfirm,
	noAsyncConfirm,
	title,
	description,
}) => {
	let [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div onClick={() => setIsOpen(true)}>{children}</div>

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
								<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-2xl font-medium text-secondary"
									>
										{title}
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-dark-gray">{description}</p>
									</div>

									<div className="mt-4 flex gap-3">
										<Button
											btnType="secondary-btn"
											onClick={() => setIsOpen(false)}
											noAsync
										>
											Cancel
										</Button>

										<Button
											btnType="primary-btn"
											onClick={async () => {
												setIsOpen(false);
												await handleConfirm();
											}}
											noAsync={noAsyncConfirm}
										>
											Confirm
										</Button>
									</div>
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
