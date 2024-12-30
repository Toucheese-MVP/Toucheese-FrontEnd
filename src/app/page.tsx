"use client";

import dynamic from "next/dynamic";

import { defaultConcept } from "@/types/Concept.type";
import { useConcept } from "@/features/studios/hooks/useConcept";
import Image from "next/image";
import Link from "next/link";
import { useConceptStore } from "@/features/common/store/useConceptStore";
const Header = dynamic(() => import("@/features/common/components/header"));
const SearchBar = dynamic(() => import("@/features/searchBar/searchBar"));

function Home() {
  const { data: conceptList } = useConcept();
  const { setConceptId, setConceptName } = useConceptStore();

  return (
    <div className="-mt-16">
      <Header />
      <SearchBar />
      <div className="grid grid-cols-2 gap-4 w-full pb-4">
        {conceptList.map((concept: defaultConcept, index: number) => (
          <Link
            href={`/studios?conceptId=${concept.id}`}
            key={concept.id}
            className="rounded-lg overflow-hidden shadow-md group aspect-[3/4]"
            aria-label={concept.name}
            onClick={() => {
              setConceptId(concept.id);
              setConceptName(concept.name);
            }}
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={`https://www.toucheese-macwin.store/concept${index + 1}.webp`}
                alt={concept.name}
                fill
                className="object-cover duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                loading={index === 0 ? "eager" : "lazy"}
                quality={75}
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black py-2 sm:py-6 text-center">
                <h1 className="text-white sm:text-lg font-semibold">
                  {concept.name}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
