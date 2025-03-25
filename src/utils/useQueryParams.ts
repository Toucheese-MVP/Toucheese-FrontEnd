import { useSearchParams } from "next/navigation";

export const useQueryParams = (idKey: string, pageKey: string = "page") => {
  const searchParams = useSearchParams();
  const id = searchParams.get(idKey) ?? null;
  const pageParam = searchParams.get(pageKey);
  const pageIndex = parseInt(pageParam || "1", 10) - 1;

  return { id, pageIndex };
};
