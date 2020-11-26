import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook } from "react-feather";
import { Candidate } from "lib/contentTypes";
export function CandidateCard({ candidate }: { candidate: Candidate }) {
  useEffect(() => {
    const card = document.querySelector(".card")!;
    const mainLink = card?.querySelector(".candidate-detail");
    function handleClick() {
      const noTextSelected = !window.getSelection().toString();
      if (noTextSelected) {
        // @ts-ignore
        mainLink.firstElementChild.click();
      }
    }
    card.addEventListener("click", handleClick);
    return () => {
      card.removeEventListener("click", handleClick);
    };
  });
  return (
    <li className="card cursor-pointer">
      <div className="flex items-center space-x-4 lg:space-x-6">
        <div className="w-16 h-16 lg:w-20 lg:h-20 ">
          <Image
            className="rounded-full object-cover"
            src={candidate.mainImage.url}
            alt={candidate.mainImage.title}
            width={300}
            height={300}
          />
        </div>

        <div className="font-medium text-lg leading-6 space-y-1 ">
          <h3 className="candidate-detail">
            <Link href={`/candidat/${candidate.slug}`}>{candidate.name}</Link>
          </h3>
          <p className="text-red-600 truncate">
            {candidate.review.substring(0, 20)}...
          </p>
        </div>
      </div>
    </li>
  );
}
