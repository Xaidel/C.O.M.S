import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { CircleArrowLeft, PlusIcon, Upload } from "lucide-react";
import { NavigateFunction } from "react-router-dom";
import { CoaepBaseColumn } from "./CoaepBaseColumn";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface TabProps {
  courseName: string
  navigate: NavigateFunction;
}

export default function ILOTab({ courseName, navigate }: TabProps) {
  return (
    <>
      <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937] mb-6">
        <Button variant="ghost" onClick={() => navigate("/coaep/course")}>
          <CircleArrowLeft />
        </Button>
        {courseName}
      </div>
      <DataTable
        resource="Course Outcomes"
        columns={[
          ...CoaepBaseColumn,
          {
            header: "Blooms Taxonomy Level",
          },
          {
            header: "Intended Learning Outcomes",
          },
        ]}
        data={[]}
      />
      <div className="mt-4 flex justify-start gap-3">
        <Button variant="outline">
          <Upload size={20} /> <span className="ml-1">Upload CSV</span>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon size={20} />{" "}
              <span className="ml-1">Create Intended Learning Outcomes</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-[#DC2626] text-xl">
                Add Intended Learning Outcomes
              </DialogTitle>
              <DialogDescription>
                Create Intended Learning Outcome Statement for{" "} <span className="font-bold">{courseName}</span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
