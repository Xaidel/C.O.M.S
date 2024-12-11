import { useToast } from "@/hooks/use-toast";
//import client from "@/service/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

/*interface AssignFacultyProps {
  courseID: number;
  userID: string;
}*/

export function useAssignFaculty() {
  const { toast } = useToast();
  const { currID } = useParams();
  const queryClient = useQueryClient();
  const { mutate: assignFaculty, isPending: isCreating } = useMutation({
    mutationFn: async (/*props: AssignFacultyProps*/) => {
      // const courseID = props.courseID;
      //   const userID = props.userID;
      //     await client.Course().assignFaculty(courseID, userID);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`curriculum-${currID}`] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed!",
        description: error.message,
        duration: 3000,
      });
    },
  });
  return { assignFaculty, isCreating };
}
