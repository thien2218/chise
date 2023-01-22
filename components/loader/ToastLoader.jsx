import { Fragment } from "react";
import { Transition } from "@headlessui/react";

const ToastLoader = ({ isProcessing }) => {
	return (
		<Transition
         show={isProcessing}
         as={Fragment}
         enter="transition duration-200"
         enterFrom="opacity-0 -translate-y-6"
         enterTo="opacity-100 translate-y-0"
         leave="transition duration-300 delay-[1.25s]"
         leaveFrom="opacity-100 translate-y-0"
         leaveTo="opacity-0 -translate-y-6"
      >
         <div className="fixed left-1/2 -translate-x-1/2 z-40 flex items-center rounded-full shadow-md bg-white h-12 pr-3 top-8">
            {isProcessing ? (
               <div className="lds-ripple -translate-x-4">
                  <div></div>
                  <div></div>
               </div>
            ) : (
               <div className="checker-wrapper">
                  <svg className="checker" viewBox="0 0 24 24">
                     <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" />
                  </svg>
               </div>
            )}
         
            <span className="text-sm -ml-4 text-dark-gray">
               {isProcessing ? "Processing..." : "Completed!"}
            </span>
         </div>
      </Transition>
	);
};

export default ToastLoader;
