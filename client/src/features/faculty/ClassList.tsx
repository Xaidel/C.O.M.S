import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { Student, StudentResponse } from "@/types/Interface";
import { Plus, Trash2 } from "lucide-react"; // Add Trash2 icon for the delete button
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UploadClassList from "./UploadClassList";
import { useClassList } from "./useClassList";

export default function ClassList() {
  const { courseID } = useParams<{ courseID: string }>();
  const parsedCourseID = parseInt(courseID || "");
  const { data, isLoading } = useClassList(parsedCourseID);
  const [students, setStudents] = useState<Student[]>([]);

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

  const handleDelete = (userID: string) => {
    // Implement your delete logic here
    console.log(`Delete student with UserID: ${userID}`);
    setStudents((prev) => prev.filter((student) => student.UserID !== userID));
  };

  if (isLoading) return <div>Loading...</div>;

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
              cell: ({ row }) => (
                <div className="flex justify-between items-center">
                  <span>{row.original.Fullname}</span>
                  <button
                    className="p-1 text-gray-400 hover:text-gray-800 transition-colors"
                    onClick={() => handleDelete(row.original.UserID)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ),
            },
            { id: "action" },
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
