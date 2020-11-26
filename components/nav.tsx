import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Facebook, Mail } from "react-feather";
const parties = [
  {
    partyShort: "PSD",
    party: "Partidul Social Democrat",
    slug: "psd",
  },
  {
    partyShort: "PNL",
    party: "Partidul Național Liberal",
    slug: "pnl",
  },
  {
    partyShort: "PMP",
    party: "Partidul Mișcarea Populară",
    slug: "pmp",
  },
  {
    partyShort: "PRO Romania",
    party: "PRO Romania Social Liberal",
    slug: "pro-romania",
  },
  {
    partyShort: "ALDE",
    party: "Partidul Alianța Liberalilor și Democraților",
    slug: "alde",
  },
];
export function Nav() {
  const [show, setShow] = useState("");
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();
  const activeRoute = router.pathname;
  useEffect(() => {
    setShow("");
  }, [activeRoute]);
  return (
    <div className="relative bg-white dark:bg-gray-800">
      <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="#">
            <h1 className="font-thin text-3xl dark:text-white">Nu tot ei</h1>
          </Link>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <button
            type="button"
            onClick={() => setShowNav(true)}
            className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 dark:text-white dark:hover:text-gray-100 hover:text-gray-500 dark:hover:bg-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-100"
          >
            <span className="sr-only">Open menu</span>
            {/*Heroicon name: menu */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav className="hidden md:flex space-x-10">
          <div className="relative">
            <button
              type="button"
              className={`group bg-white dark:bg-gray-800 rounded-md ${
                activeRoute === "/partide/[:slug]"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-200"
              } inline-flex items-center text-base font-medium hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-100`}
              onClick={() => setShow((s) => (s === "partide" ? "" : "partide"))}
              onMouseEnter={() => setShow("partide")}
              onMouseLeave={() => {
                setTimeout(() => {
                  () => setShow("");
                }, 200);
              }}
            >
              <span className="">Partide</span>
              <svg
                className={`ml-2 h-5 w-5 ${
                  activeRoute === "/partide/[:slug]"
                    ? "text-gray-600 dark:text-white"
                    : "text-gray-400 dark:text-gray-600"
                } group-hover:text-gray-500 dark:group-hover:text-gray-100`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <Transition
              show={show === "partide"}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              {(ref) => (
                <div
                  ref={ref}
                  onMouseEnter={() => setShow("partide")}
                  onMouseLeave={() => setShow("")}
                  className="absolute left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0"
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="z-20 relative grid gap-6  bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
                      {parties.map((party) => (
                        <a
                          key={party.slug}
                          href={`/candidati/${party.slug}`}
                          className="-m-3 p-3 flex rounded-md hover:bg-gray-50 dark:hover:bg-gray-900"
                        >
                          <div className="flex-shrink-0 flex mt-1 items-center justify-center h-10 w-10 rounded-md">
                            <Image
                              src={`/images/parties/${party.slug}.png`}
                              height={40}
                              width={40}
                            />
                          </div>
                          <div className="ml-4 text-base font-medium">
                            <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                              {party.partyShort}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
                              {party.party}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
          </div>

          <Link href="/despre">
            <span
              className={`text-base cursor-pointer font-medium ${
                activeRoute === "/despre"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-200"
              } hover:text-gray-900 dark:hover:text-gray-100`}
            >
              Despre
            </span>
          </Link>
          <Link href="/cautare">
            <span
              className={`text-base cursor-pointer font-medium ${
                activeRoute === "/cautare"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-200"
              } hover:text-gray-900 dark:hover:text-gray-100`}
            >
              Căutare
            </span>
          </Link>
        </nav>
        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <a
            href="https://facebook.com/valeriu.nicolae.39"
            target="_blank"
            className="whitespace-nowrap text-base font-medium text-gray-500 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Facebook />
          </a>
          <a
            href="mailto:valeriu@nutotei.ro"
            className="ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100"
          >
            <Mail />
          </a>
        </div>
      </div>
      <Transition
        show={showNav}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div
            ref={ref}
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Link href="#">
                      <h1 className=" font-thin text-3xl ">Partide</h1>
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={() => setShowNav(false)}
                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <span className="sr-only">Close menu</span>
                      {/*Heroicon name: x */}
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid grid-cols-2 gap-7">
                    {parties.map((party) => (
                      <a
                        key={party.slug}
                        href={`/candidati/${party.slug}`}
                        className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                          <Image
                            src={`/images/parties/${party.slug}.png`}
                            height={40}
                            width={40}
                          />
                        </div>
                        <div className="ml-4 text-base font-medium text-gray-900">
                          {party.partyShort}
                        </div>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="/despre"
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Despre
                  </a>
                  <a
                    href="/cautare"
                    className="ml-8 text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Cautare
                  </a>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://facebook.com/valeriu.nicolae.39"
                    target="_blank"
                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    <Facebook />
                  </a>
                  <a
                    href="mailto:valeriu@nutotei.ro"
                    className="ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    <Mail />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}
