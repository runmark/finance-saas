import { client } from "@/lib/hono";
import { convertAmountFromMilliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useListTransactions = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    // TODO check when unique data need or not
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!response.ok) throw new Error("Failed to list all transactions");

      const { data } = await response.json();

      return data.map((transaction) => ({
        ...transaction,
        amount: convertAmountFromMilliunits(transaction.amount),
      }));
    },
  });
  return query;
};
