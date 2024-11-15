import { FacultyColumn, FacultyFullName } from "./FacultyColumn";
import { DataTable } from "@/components/ui/datatable";
import { Button } from "@/components/ui/button";
import { useNonPHFaculty } from "./useNonPHFaculty";
import { NonPHFaculty } from "@/types/Interface";
import { useEffect, useState } from "react";
import { useAddProgramHead } from "./useAddProgramHead";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

interface NonPHTableProps {
  programID: number;
}

interface ProgramHead {
  programID: number;
  userID: string;
}

export default function NonPHTable({ programID }: NonPHTableProps) {
  const { isLoading, response, error } = useNonPHFaculty();
  const { assignProgramHead, isCreating } = useAddProgramHead();
  const [faculties, setFaculties] = useState<FacultyFullName[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (response?.faculties) {
      const fullname = response.faculties.map((faculty: NonPHFaculty) => {
        return {
          programID: programID,
          userID: faculty.UserID,
          fullname: `${faculty.User.Firstname} ${faculty.User.Middlename.charAt(0)}. ${faculty.User.Lastname}`,
        };
      });
      setFaculties(fullname);
    }
  }, [response, programID]);
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
                          programID: row.original.programID,
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
