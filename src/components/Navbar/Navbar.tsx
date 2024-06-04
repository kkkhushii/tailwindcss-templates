"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import Drawer from "./Drawer";
import { usePathname } from "next/navigation";
import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import { useTheme } from "next-themes";

const Navbar = () => {
  const router = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  return (
    <div
      className={`left-0 top-0 z-40 flex w-full items-center border-b border-dark/10 dark:border-white/10 dark:bg-dark/10 ${sticky
          ? "shadow-nav fixed z-[999]  border-stroke bg-white/80 backdrop-blur-[5px] "
          : "absolute bg-transparent"
        }`}
    >
      <>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 container">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              {/* LOGO */}

              <Link href="/">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={25}
                    height={25}
                    className="dark:hidden"
                  />
                  <Image
                    src="/images/logo-white.svg"
                    alt="logo"
                    width={25}
                    height={25}
                    className="hidden dark:block"
                  />
                  <div className="ml-2">
                    {" "}
                    Tailwindcss <b>Templates</b>
                  </div>
                </div>
              </Link>
            </div>

            {/* SEARCH BUTTON */}
            <div className="flex items-center gap-4">
              <ul className="sm:flex hidden navbar-link gap-5">
                <li
                  className={
                    router == "/" ? "text-primary" : "hover:text-primary"
                  }
                >
                  <Link href="/">Home</Link>
                </li>

                <li
                  className={
                    router == "/contact" ? "text-primary" : "hover:text-primary"
                  }
                >
                  <Link href="/contact">Contact Us</Link>
                </li>
              </ul>
              <div className="block md:hidden mr-3">
                <IconMenu2
                  className="block h-6 w-6"
                  aria-hidden="true"
                  onClick={() => setIsOpen(true)}
                />
              </div>
              <div className="hidden items-center justify-end pr-16 sm:flex lg:pr-0 ">
                {/* theme toggler */}
                <button
                  aria-label="theme toggler"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex h-8 w-8 items-center justify-center duration-300"
                >
                  <span>
                    <svg
                      viewBox="0 0 16 16"
                      className="svg hidden size-4 dark:block "
                    >
                      <path d="M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z" />
                    </svg>

                    <svg
                      className="flex-shrink-0 size-4 dark:hidden "
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <Search />
            </div>

            {/* DRAWER LINKS DATA */}
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <ul className="navbar-link px-4 ">
                <li
                  className={
                    router == "/"
                      ? "text-primary mb-3"
                      : "hover:text-primary mb-3"
                  }
                >
                  <Link href="/">Home</Link>
                </li>
                <li
                  className={
                    router == "/blogs" ? "text-primary" : "hover:text-primary"
                  }
                >
                  <Link href="/blogs">Blogs</Link>
                </li>
                <li
                  className={
                    router == "/contact" ? "text-primary" : "hover:text-primary"
                  }
                >
                  <Link href="/contact">Contact Us</Link>
                </li>
              </ul>
            </Drawer>
          </div>
        </div>
      </>
    </div>
  );
};

export default Navbar;
