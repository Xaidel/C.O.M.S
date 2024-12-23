import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { Plus, Upload } from "lucide-react";

export default function ClassList() {
  return (
    <>
      <div className="mt-5">
        <DataTable columns={[
          { header: "Student Number" },
          { header: "Student Name" },
          { id: "action" }
        ]}
          data={[]}
          resource="Students"
        />
      </div>
      <div className="flex gap-2 mt-5">
        <Button variant="outline" className="flex gap-1"><Plus size={20} />Add Student</Button>
        <Button className="flex gap-1"><Upload size={20} />Upload Student</Button>
      </div>
    </>
  )
}
