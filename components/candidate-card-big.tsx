import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook } from "react-feather";
import { Candidate } from "lib/contentTypes";
export function CandidateCardBig({ candidate }: { candidate: Candidate }) {
  return (
    <li className="card-big cursor-pointer">
      <div className="space-y-4">
        <div className="">
          <Link href={`/politruc/${candidate.slug}`}>
            <a title={candidate.name}>
              <Image
                className="object-cover shadow-lg rounded-lg"
                src={candidate.mainImage.url}
                alt={candidate.mainImage.title}
                width={384}
                height={256}
                layout="responsive"
              />
            </a>
          </Link>
        </div>
        <div className="text-lg leading-6 font-medium space-y-1">
          <h3 className="candidate-detail">
            <Link href={`/politruc/${candidate.slug}`}>
              <a title={candidate.name}>{candidate.name}</a>
            </Link>
          </h3>
          <p className="text-red-600">{candidate.party}</p>
        </div>
        <div className="text-lg">
          <p className="text-gray-500">
            {candidate.review.substring(0, 180)}...
          </p>
        </div>

        <ul className="flex space-x-5">
          {candidate.facebookLink && (
            <li>
              <a
                href={candidate.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Sursa Facebook"
                className="text-gray-400 hover:text-gray-500 cursor-pointer clickable"
              >
                <span className="sr-only">Sursa Facebook</span>
                <Facebook size={18} />
              </a>
            </li>
          )}
          {candidate?.documentsCollection?.items.map((document) => (
            <li key={document.fileName}>
              <a
                href={document.url}
                target="_blank"
                title={`Sursa CV - ${document.title}`}
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 cursor-pointer clickable"
              >
                <span className="sr-only">Sursa CV - {document.title}</span>
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
          ))}
        </ul>
      </div>
    </li>
  );
}
