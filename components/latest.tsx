import { Candidate } from "lib/contentTypes";
import Image from "next/image";
import { Facebook } from "react-feather";

export function Latest({ candidates }: { candidates: Candidate[] }) {
  return (
    <div className="bg-white">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          <div className="space-y-5 sm:space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ultimii aleși
            </h2>
            <p className="text-xl text-gray-500">
              Postăm în fiecare săptămână profiluri de politicieni. Timpul ne
              omoară, că material de descoperit avem!
            </p>
          </div>
          <div className="lg:col-span-2">
            <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
              {candidates.map((candidate) => {
                return (
                  <li key={candidate.sys.id}>
                    <div className="space-y-4">
                      <div className="">
                        <Image
                          className="object-cover shadow-lg rounded-lg"
                          src={candidate.mainImage.url}
                          alt={candidate.mainImage.title}
                          width={384}
                          height={256}
                          layout="responsive"
                        />
                      </div>
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{candidate.name}</h3>
                        <p className="text-red-600">{candidate.party}</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500">{candidate.review}</p>
                      </div>

                      <ul className="flex space-x-5">
                        <li>
                          <a
                            href={candidate.facebookLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Sursa Facebook"
                            className="text-gray-400 hover:text-gray-500 cursor-pointer"
                          >
                            <span className="sr-only">Sursa Facebook</span>
                            <Facebook size={18} />
                          </a>
                        </li>
                        {candidate?.documentsCollection?.items.map(
                          (document) => (
                            <li>
                              <a
                                href={document.url}
                                target="_blank"
                                title={`Sursa CV - ${document.title}`}
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">
                                  Sursa CV - {document.title}
                                </span>
                                <svg
                                  className="w-5 h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
