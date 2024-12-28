import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { Student, StudentResponse } from "@/types/Interface";
import { Plus, Trash2 } from "lucide-react"; // Add Trash2 icon for the delete button
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UploadClassList from "./UploadClassList";
import { useClassList } from "./useClassList";
import { useDeleteStudent } from "./useDeleteStudent";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ClassList() {
  const { courseID } = useParams<{ courseID: string }>();
  const parsedCourseID = parseInt(courseID || "");
  const { data, isLoading } = useClassList(parsedCourseID);
  const [students, setStudents] = useState<Student[]>([]);
  const deleteStudent = useDeleteStudent()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (data?.classlist) {
      const studentList = data.classlist
        ?.map((student: StudentResponse) => {
          return {
            UserID: student.UserID,
            Fullname: `${student.User.Lastname}, ${student.User.Firstname} ${student.User.Middlename || ""}`.trim(),
          };
        })
        .sort((a, b) => a.Fullname.localeCompare(b.Fullname)); // Sort alphabetically by Fullname

      setStudents(studentList);
    }
  }, [data]);

  const handleDelete = (studentID: string, studentName: string) => {
    deleteStudent.mutate({ studentID, courseID: parsedCourseID }, {
      onSettled: () => {
        toast({
          variant: "success",
          title: "Success!",
          description: `${studentName} was deleted`,
          duration: 3000,
        })
        queryClient.invalidateQueries({ queryKey: [`${parsedCourseID}-students`] })
      },
    })
  };

  if (isLoading) return

  return (
    <>
      <div className="mt-5">
        <DataTable
          columns={[
            {
              accessorKey: "UserID",
              header: "Student Number",
            },
            {
              accessorKey: "Fullname",
              header: "Student Name",
            },
            {
              id: "action",
              header: "",
              cell: ({ row }) => {
                const student = row.original
                return (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" className="text-gray-400 hover:text-red" onClick={() => handleDelete(student.UserID, student.Fullname)}>
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Student</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              }
            },
          ]}
          data={students}
          resource="Students"
        />
      </div>
      <div className="flex gap-2 mt-5">
        <Button className="flex gap-1">
          <Plus size={20} />
          Add Student
        </Button>
        <UploadClassList />
      </div>
    </>
  );
}
