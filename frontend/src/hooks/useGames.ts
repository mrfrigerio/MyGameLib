// hooks/useGames.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../service/api";

interface IUseGames {
  search?: string;
  ordering?: string;
  platforms?: string;
}

export const useGames = ({
  search = "",
  ordering = "",
  platforms = "",
}: IUseGames) => {
  return useInfiniteQuery({
    queryKey: ["games", search, ordering, platforms],
    initialPageParam: "1",
    getPreviousPageParam: (firstPage: RawgGamesResponse) => {
      const prev = firstPage.previous;
      if (!prev) return undefined;
      const urlParams = new URLSearchParams(prev.split("?")[1]);
      return urlParams.get("page");
    },
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/games`, {
        params: { page: pageParam, search, ordering, platforms },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      const next = lastPage.next;
      if (!next) return undefined;
      const urlParams = new URLSearchParams(next.split("?")[1]);
      return urlParams.get("page");
    },
  });
};
