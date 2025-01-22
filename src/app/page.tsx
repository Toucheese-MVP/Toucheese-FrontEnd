"use client";

import { defaultConcept } from "@/types/Concept.type";
import { useConcept } from "@/features/studios/hooks/useConcept";
import ConceptCard from "@/features/home/ConceptCard";
import Header from "@/features/common/components/header";
import SearchBar from "@/features/searchBar/searchBar";

function Home() {
  const { data: conceptList, loading } = useConcept();

  return (
    <div className="-mt-16">
      <Header />
      <SearchBar />
      <div className="grid grid-cols-2 gap-4 w-full pb-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ConceptCard key={index} isLoading={true} />
            ))
          : conceptList.map((concept: defaultConcept, index: number) => (
              <ConceptCard
                key={concept.id}
                id={concept.id}
                name={concept.name}
                index={index}
                isLoading={false}
              />
            ))}
      </div>
    </div>
  );
}

export default Home;
