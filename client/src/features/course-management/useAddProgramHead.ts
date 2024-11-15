import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/service/api";
import { useToast } from "@/hooks/use-toast";

interface ProgramHead {
  programID: number;
  userID: string;
}

export function useAddProgramHead() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: assignProgramHead, isPending: isCreating } = useMutation({
    mutationFn: async (programHead: ProgramHead) => {
      const programID = programHead.programID;
      const userID = programHead.userID;

      await client.ProgramHead().create({ programID, userID });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed!",
        description: error.message,
        duration: 5000,
      });
    },
  });
  return { assignProgramHead, isCreating };
}
