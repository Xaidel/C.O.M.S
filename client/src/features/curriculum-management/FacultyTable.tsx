import { currentUser, NonPHFaculty } from "@/types/Interface";
import { useQueryClient } from "@tanstack/react-query";
import { useFacultyByDept } from "../course-management/useFacultyByDept";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/datatable";
import {
  FacultyColumn,
  FacultyFullName,
} from "../course-management/FacultyColumn";
import { Button } from "@/components/ui/button";
import { useAssignFaculty } from "./useAssignFaculty";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

interface FacultyTableProps {
  courseID: number;
  userID?: string;
}

export default function FacultyTable({ courseID, userID }: FacultyTableProps) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<currentUser>(["current-user"]);
  const { currID } = useParams<{ currID: string }>()
  const curr = !currID ? "" : currID
  const departmentID = user?.role_info?.Programs?.[0].Department?.ID;
  const { isLoading, response, error } = useFacultyByDept(departmentID || 0);
  const [faculties, setFaculties] = useState<FacultyFullName[]>([]);

  const { mutate, isCreating } = useAssignFaculty();
  useEffect(() => {
    if (response?.faculties) {
      const fullname = response.faculties?.map((faculty: NonPHFaculty) => {
        return {
          courseOrProgramID: courseID || 0,
          userID: faculty.UserID,
          fullname: `${faculty.User.Firstname} ${faculty.User.Middlename.charAt(0)}. ${faculty.User.Lastname}`,
        };
      });
      const filteredFullname =
        userID === undefined
          ? fullname
          : fullname.filter((fac) => fac.userID !== userID);
      setFaculties(filteredFullname);
    }
  }, [response, courseID, userID]);
  if (isLoading) return;
  if (error) return;
  const handleFacultyAssigning = (courseID: number, userID: string) => {
    const faculty = faculties.find((fac) => fac.userID === userID);
    if (faculty) {
      mutate(
        { id: courseID, userID },
        {
          onSuccess: () => {
            setFaculties((prevList) =>
              prevList.filter((fac) => fac.userID !== userID),
            );
            toast({
              variant: "success",
              title: "Success!",
              description: `${faculty.fullname} successfully assign as Teacher`,
            });
            queryClient.invalidateQueries({ queryKey: [`curriculum-${curr}`] })
          },
          onError: (err) => {
            toast({
              variant: "destructive",
              title: "Failed!",
              description: err.message
            })
          }
        },
      );
    }
  };

  return (
    <>
      <div className="min-w-full max-h-80 overflow-y-scroll flex flex-col gap-2">
        <DataTable
          resource="Faculty"
          columns={[
            ...FacultyColumn,
            {
              id: "action",
              header: "",
              cell: ({ row }) => {
                const userID = row.original.userID;
                return (
                  <div className="flex justify-center">
                    {isCreating ? (
                      <Button disabled className="w-fullp-6">
                        <Loader className="mr-2 h-5 w-5 animate-spin text-lg" />
                      </Button>
                    ) : (
                      <Button onClick={() => {
                        handleFacultyAssigning(courseID, userID)
                      }}>
                        Assign
                      </Button>
                    )}
                  </div>
                );
              },
            },
          ]}
          data={faculties}
        />
      </div>
    </>
  );
}
