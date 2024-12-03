import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { useToast } from "@/hooks/use-toast";
import { DepartmentResponse, NonPHFaculty } from "@/types/Interface";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { FacultyColumn, FacultyFullName } from "./FacultyColumn";
import { useAddProgramHead } from "./useAddProgramHead";
import { useQueryClient } from "@tanstack/react-query";
import { useFacultyByDept } from "./useFacultyByDept";

interface NonPHTableProps {
  programID: number;
  userID?: string;
}

interface ProgramHead {
  programID: number;
  userID: string;
}

export default function NonPHTable({ programID, userID }: NonPHTableProps) {
  const queryClient = useQueryClient();
  const department = queryClient.getQueryData<DepartmentResponse>([
    "department",
  ]);
  const departmentID = department?.department?.ID;
  const { isLoading, response, error } = useFacultyByDept(departmentID || 0);
  const { assignProgramHead, isCreating } = useAddProgramHead();
  const [faculties, setFaculties] = useState<FacultyFullName[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (response?.faculties) {
      const fullname = response.faculties.map((faculty: NonPHFaculty) => {
        return {
          courseOrProgramID: programID,
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
  }, [response, programID, userID]);
  if (isLoading) return;
  if (error) return;
  const handlePHAssigning = (programHead: ProgramHead) => {
    const faculty = faculties.find((fac) => fac.userID === programHead.userID);
    if (faculty) {
      assignProgramHead(
        { ...programHead },
        {
          onSuccess: () => {
            setFaculties((prevList) =>
              prevList.filter((fac) => fac.userID !== programHead.userID),
            );
            toast({
              variant: "success",
              title: "Success!",
              description: `${faculty.fullname} successfully assigned as Program Head`,
            });
          },
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
              id: "select",
              header: "",
              cell: ({ row }) => (
                <div className="flex justify-center">
                  {isCreating ? (
                    <Button disabled className="w-full p-6">
                      <Loader className="mr-2 h-5 w-5 animate-spin text-lg" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        handlePHAssigning({
                          programID: row.original.courseOrProgramID,
                          userID: row.original.userID,
                        });
                      }}
                    >
                      Assign
                    </Button>
                  )}
                </div>
              ),
            },
          ]}
          data={faculties}
        />
      </div>
      <div className="mt-2" />
    </>
  );
}
