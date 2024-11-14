import { DataTable } from "@/components/ui/datatable";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FacultyColumn, FacultyFullName } from "./FacultyColumn";

const faculties: FacultyFullName[] = [
  {
    fullname: "John Mark Ralota",
  },
  {
    fullname: "Aliyah Luntok",
  },
  {
    fullname: "Aliyah Luntok",
  },
  {
    fullname: "Aliyah Luntok",
  },
  {
    fullname: "Aliyah Luntok",
  },
  {
    fullname: "Aliyah Luntok",
  },
];

export default function EditProgramHead() {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl">Edit Program Head</DialogTitle>
        <DialogDescription>
          Choose a <span className="font-bold">Faculty</span> Member among the{" "}
          <span className="font-bold">
            School of Computer and Information Sciences
          </span>
        </DialogDescription>
      </DialogHeader>
      <div className="min-w-full max-h-80 overflow-y-scroll flex flex-col gap-2">
        <DataTable columns={FacultyColumn} data={faculties} />
      </div>
      <div className="mt-2" />
    </>
  );
}
