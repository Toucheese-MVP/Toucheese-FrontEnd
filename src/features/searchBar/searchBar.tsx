import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearch } from "@/features/searchBar/hooks/useSearch";
import Link from "next/link";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const { data: results, loading, error } = useSearch(debouncedQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full relative min-h-16 mb-4">
      <div className="absolute z-20 w-full rounded-xl bg-gray-1 p-4 border">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Image
            src="/icons/search.svg"
            alt="검색 아이콘"
            width={24}
            height={24}
          />
          <label htmlFor="search-input" className="sr-only">
            검색창
          </label>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="스튜디오 찾기"
            className="flex-grow border-none outline-none bg-transparent text-gray-6 font-medium text-md"
            aria-label="스튜디오 검색"
          />
          <button type="submit" className="ml-2" aria-label="검색"></button>
        </form>

        {loading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-2"></div>
          </div>
        )}

        {error && <div className="p-4 text-red-500">{error}</div>}

        <div aria-live="polite">
          {!loading &&
            debouncedQuery.trim() &&
            Array.isArray(results) &&
            results.length > 0 && (
              <ul className="w-full rounded-b-lg max-h-screen overflow-y-scroll scrollbar-hide mt-4 transition-all">
                {results.map((studio, index) => (
                  <li
                    key={studio.id || `studio-${index}`}
                    className="flex items-center gap-2 cursor-pointer border-b py-4 last:border-0"
                  >
                    {/* {studio.profileImage ? (
                      <Image
                        src={studio.profileImage}
                        alt={`${studio.name}의 프로필 이미지`}
                        className="max-w-10 max-h-10 rounded-full overflow-hidden aspect-1/1"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300" />
                    )} */}
                    <Link href={`studios/${studio.id}`}>
                      <div className="text-gray-6">
                        <h3 className="text-lg font-semibold">{studio.name}</h3>
                        <p className="text-sm">
                          {studio.address || "주소 정보 없음"}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

          {!loading &&
            debouncedQuery.trim() &&
            (!Array.isArray(results) || results.length === 0) && (
              <div className="py-4 rounded-b-lg text-gray-6">
                검색 결과가 없습니다.
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
