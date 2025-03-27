import { useCallback } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { getCookie } from "@/utils/cookieUtils/cookieUtils";

type UserData = {
  memberId: number;
  name: string;
  email: string;
  phone: string;
};

export function useFetchUser() {
  const { loading, error, request } = useRequest<UserData>();

  const fetchUser = useCallback(
    async (page: number) => {
      const token = getCookie("accessToken");
      if (!token) {
        console.error("Token not found");
        return;
      }

      try {
        const response = await request("GET", `/v1/members?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response;
      } catch (err) {
        console.error("Failed to fetch user:", err);
        throw err; // Ensure the error is propagated
      }
    },
    [request]
  );

  return {
    loading,
    error,
    refetch: fetchUser,
  };
}
