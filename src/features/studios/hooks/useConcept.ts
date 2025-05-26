import { defaultConcept } from "@/types/Concept.type";
import { apiRequest } from "@/api/apiRequest";

export async function getConceptList(): Promise<defaultConcept[]> {
  return await apiRequest<defaultConcept[]>("GET", "/v1/concepts");
}
