import { DataTable } from "@/components/ui/datatable";
import { FacultyColumn, FacultyFullName } from "./FacultyColumn";

const faculties: FacultyFullName[] = [];

export default function EditProgramHead() {
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
