import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAccount = (id: string) => {
  const query = useQuery({
    queryKey: ["account", id],
    queryFn: async () => {
      const res = await client.api.accounts.$get(id);
      if (!res.ok) throw new Error("Failed to fetch account");

      const { data } = await res.json();
      return data;
    },
  });

  return query;
};
