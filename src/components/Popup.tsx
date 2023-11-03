import React, { ReactNode, useEffect, useRef } from "react";
import closing from "../assets/close.svg";

interface ModalProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
  title?: ReactNode;
  closeOnClickOutside?: boolean;
}

export const Popup: React.FC<ModalProps> = ({
  title,
  trigger,
  setTrigger,
  closeOnClickOutside,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      closeOnClickOutside &&
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      setTrigger(false);
    }
  };

  useEffect(() => {
    if (trigger) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [trigger, setTrigger]);

  return trigger ? (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-80 inset-0 flex items-center justify-center ${
        trigger ? "z-50" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="relative w-[450px] h-auto items-center p-8 w-2/5 h-1/2 bg-white rounded-lg"
      >
        <div className="p-4 border-b rounded-t text-center items-center dark:border-gray-600">
          {title}
          <button
            onClick={() => {
              setTrigger(false);
            }}
            type="button"
            className="absolute  border-transparent hover:border-transparent focus:ring-0  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg top-4 right-4"
          >
            <img className="w-3 h-3" src={closing} alt="close" />

            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  ) : (
    ""
  );
};
