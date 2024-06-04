import React, { ReactNode } from "react"; 
import { IconX } from "@tabler/icons-react";

interface DrawerProps {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {

    return (
        <main
            className={
                " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
                (isOpen
                    ? " transition-opacity opacity-100 duration-500 backdrop-contrast-50 "
                    : " transition-all delay-500 opacity-0 -translate-x-full  ")
            }
        >
            <section
        className={
            "w-340px max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
            (isOpen ? "translate-x-0" : "-translate-x-full")
        }
    >

                <article className="relative w-340px max-w-lg pb-10 flex flex-col space-y-6 h-full">
                    <header className="p-4 flex items-center">
                    <img
                    src="/assets/logo/react-js.png"
                    alt="logo"
                    width={25}
                    height={25}
                    onClick={() => {
                        setIsOpen(false);
                    }}
                  />
                  <div className="ml-2">
                    {" "}
                    React <b>Themes</b>
                  </div>
                    
                    <IconX className="block ml-3 h-4 w-4" onClick={() => {
                        setIsOpen(false);
                    }} />
                    </header>
                    <div onClick={() => {
                        setIsOpen(false);
                    }}>{children}</div>
                </article>
            </section>
            <section
                className=" w-screen h-full cursor-pointer "
                onClick={() => {
                    setIsOpen(false);
                }}
            ></section>
        </main>
    );
}

export default Drawer;
