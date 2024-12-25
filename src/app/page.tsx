"use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import Header from "@/features/common/components/header";
import { defaultConcept } from "@/types/Concept.type";
import { useConcept } from "@/features/studios/hooks/useConcept";
import SearchBar from "@/features/searchBar/searchBar";
import Image from "next/image";
import Link from "next/link";
import { useConceptStore } from "@/features/common/store/useConceptStore";
// import { getCookie } from "@/utils/getcookie";

function Home() {
  // const router = useRouter();
  const { data: conceptList } = useConcept();
  const { setConceptId, setConceptName } = useConceptStore();

  // useEffect(() => {
  //   const token = getCookie("refreshToken");

  //   if (!token) {
  //     router.push("/members/login/");
  //   }
  // }, [router]);

  return (
    <div className="-mt-16">
      <Header />
      <SearchBar />
      <div className="grid grid-cols-2 gap-4 w-full pb-4">
        {conceptList.map((concept: defaultConcept, index: number) => (
          <Link
            href={`/studios?conceptId=${concept.id}`}
            key={concept.id}
            className="relative rounded-lg overflow-hidden shadow-md group aspect-[3/4]"
            aria-label={concept.name}
            onClick={() => {
              setConceptId(concept.id);
              setConceptName(concept.name);
            }}
          >
            <Image
              src={`/concept${index + 1}.png`}
              alt={concept.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black py-2 sm:py-6 text-center">
              <h1 className="text-white sm:text-lg font-semibold">
                {concept.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
