import { FacultyColumn, FacultyFullName } from "./FacultyColumn";
import { DataTable } from "@/components/ui/datatable";
import { useNonPHFaculty } from "./useNonPHFaculty";
import { NonPHFaculty } from "@/types/Interface";
import { useEffect, useState } from "react";

const faculties: FacultyFullName[] = [];

const convertToFullName = (nonPHfaculties: NonPHFaculty[]) => {
  nonPHfaculties.map((faculty: NonPHFaculty) => {
    const fullname = `${faculty.User.Firstname} ${faculty.User.Middlename.charAt(0)}. ${faculty.User.Lastname}`;
    faculties.push({ fullname });
  });
};

export default function NonPHTable() {
  const { isLoading, response, error } = useNonPHFaculty();
  const [faculties, setFaculties] = useState<FacultyFullName[]>([]);

  useEffect(() => {
    if (response?.faculties) {
      const fullname = response.faculties.map((faculty: NonPHFaculty) => {
        return {
          fullname: `${faculty.User.Firstname} ${faculty.User.Middlename.charAt(0)}. ${faculty.User.Lastname}`,
        };
      });
      setFaculties(fullname);
    }
  }, [response]);
  if (isLoading) return;
  if (error) return;
  convertToFullName(response?.faculties || []);
  return (
    <>
      <div className="min-w-full max-h-80 overflow-y-scroll flex flex-col gap-2">
        <DataTable
          resource="Faculty"
          columns={FacultyColumn}
          data={faculties}
        />
      </div>
      <div className="mt-2" />
    </>
  );
}
