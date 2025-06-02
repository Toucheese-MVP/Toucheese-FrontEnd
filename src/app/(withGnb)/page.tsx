import { getConceptList } from "@/features/studios/hooks/useConcept";
import ConceptCard from "@/features/home/ConceptCard";
import Header from "@/features/common/components/header";
import SearchBar from "@/features/searchBar/searchBar";

export default async function Home() {
  const conceptList = await getConceptList();

  return (
    <div className="-mt-16">
      <Header />
      <SearchBar />
      <div className="grid grid-cols-2 gap-4 w-full pb-4">
        {conceptList.map((concept, index) => (
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
