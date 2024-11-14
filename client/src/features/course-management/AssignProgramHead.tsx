import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FacultyColumn, FacultyFullName } from "./FacultyColumn";
import { DataTable } from "@/components/ui/datatable";

const faculties: FacultyFullName[] = [];

export default function AssignProgramHead() {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">Assign Program Head</DialogTitle>
        <DialogDescription>
          Choose a <span className="font-bold">Faculty</span> Member among the{" "}
          <span className="font-bold">
            School of Computer and Information Sciences
          </span>
        </DialogDescription>
      </DialogHeader>
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
