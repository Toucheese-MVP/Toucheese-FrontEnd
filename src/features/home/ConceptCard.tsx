import Image from "next/image";
import Link from "next/link";
import { useConceptStore } from "@/features/common/store/useConceptStore";

interface ConceptCardProps {
  id?: number;
  name?: string;
  index?: number;
  isLoading: boolean; // ✅ 부모로부터 isLoading을 props로 받음
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  name,
  index,
  isLoading,
}) => {
  const { setConceptId, setConceptName } = useConceptStore();

  const handleClick = () => {
    if (!id || !name) return;
    setConceptId(id);
    setConceptName(name);
  };

  return (
    <Link
      href={id ? `/studios?conceptId=${id}` : "#"}
      key={id}
      className="rounded-lg overflow-hidden shadow-md group aspect-[3/4] relative"
      aria-label={name || "Loading..."}
      onClick={handleClick}
    >
      {isLoading ? (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      ) : (
        <div className="relative aspect-[3/4]">
          <Image
            src={`/concept${index! + 1}.webp`}
            alt={name!}
            fill
            className="object-cover duration-300 hover:scale-105 transition-all"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            loading="lazy"
            quality={75}
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black py-2 sm:py-6 text-center">
            <h1 className="text-white sm:text-lg font-semibold">{name}</h1>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ConceptCard;
