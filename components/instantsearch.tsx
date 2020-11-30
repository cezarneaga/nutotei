import Link from "next/link";
import { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { Transition } from "@headlessui/react";

import {
  InstantSearch,
  SearchBox,
  Configure,
  Hits,
  PoweredBy,
  Highlight,
} from "react-instantsearch-dom";
import { ArrowRightCircle } from "react-feather";

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;

const searchClient = algoliasearch(appId, searchKey);

export function Search() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <InstantSearch indexName={indexName} searchClient={searchClient}>
      <div className="group md:leading-6 md:ml-20 font-medium flex items-center space-x-3 sm:space-x-4 hover:text-gray-600 transition-colors duration-200">
        <SearchBox
          onChange={() => setIsOpen(true)}
          translations={{
            placeholder: "Caută aici...",
          }}
        />
      </div>

      <div
        className={`${
          isOpen ? "" : "hidden"
        } fixed inset-0 top-20 overflow-hidden z-10`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <section
            className="absolute inset-y-0 right-0 md:pl-10 max-w-full flex"
            aria-labelledby="slide-over-heading"
          >
            <Transition
              show={isOpen}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              {(ref) => (
                <div ref={ref} className="w-screen max-w-md">
                  <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <PoweredBy
                          translations={{
                            searchBy: "search by",
                          }}
                        />
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <span className="sr-only">Close panel</span>
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
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      {/* <!-- Replace with your content --> */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <Configure hitsPerPage={6} />
                        <Hits hitComponent={Hit} />
                      </div>
                      {/* <!-- /End replace --> */}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
          </section>
        </div>
      </div>
    </InstantSearch>
  );
}
function Hit({ hit }) {
  return (
    <div className="">
      <Link href={`/candidat/${hit.slug}`}>
        <a className="inline-flex line-1">
          <Highlight
            attribute="name"
            hit={hit}
            className="text-gray-800  text-lg font-semibold overflow-ellipsis overflow-hidden"
          />
          {hit.party && (
            <span className="inline-flex items-center ml-2 my-1 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
              <Highlight attribute="party" hit={hit} />
            </span>
          )}
        </a>
      </Link>
      <br />
      <span className="hit-summary">
        <Highlight attribute="review.review" hit={hit} />
      </span>
      <Link href={`/candidat/${hit.slug}`}>
        <a style={{ float: "right", display: "inline-block", marginRight: 10 }}>
          <ArrowRightCircle />
        </a>
      </Link>
    </div>
  );
}
