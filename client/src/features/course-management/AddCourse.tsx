import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [touched, setTouched] = useState({
    courseName: false,
    courseCode: false,
  });

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      courseName: true,
      courseCode: true,
    });

    //Proceeds when input has values
    if (courseName && courseCode) {
      console.log("Course Added:", { courseName, courseCode });
      setCourseName("");
      setCourseCode("");
      setTouched({
        courseName: false,
        courseCode: false,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#3C444E] hover:bg-[#4B5563] !text-white">
          <Plus className="mr-2 h-4 w-" />
          Add Course
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-red-500 text-2xl">
            Add Course
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleAddCourse} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[#4B5563] font-bold text-sm">
              Course Code
            </Label>
            <Input
              id="courseCode"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, courseCode: true }))
              }
              placeholder="Enter course code"
              className={
                touched.courseCode && !courseCode ? "border-red-500" : ""
              }
            />
            {touched.courseCode && !courseCode && (
              <p className="text-sm text-red-500">This field is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-[#4B5563] font-bold text-sm">
              Course Name
            </Label>
            <Input
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, courseName: true }))
              }
              placeholder="Enter course name"
              className={
                touched.courseName && !courseName ? "border-red-500" : ""
              }
            />
            {touched.courseName && !courseName && (
              <p className="text-sm text-red-500">This field is required</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 bg-[#3C444E] hover:bg-[#4B5563] !text-white"
            >
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
