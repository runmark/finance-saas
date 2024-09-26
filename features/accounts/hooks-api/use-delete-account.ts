import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";

const ResponseType = InferResponseType<typeof client.api.accounts.$delete>;

export const useDeleteAccount = (id: string) => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (id: string) => {
      const res = await client.api.accounts.$delete(id);
      return await res.json();
    },
  });

  return mutation;
};
