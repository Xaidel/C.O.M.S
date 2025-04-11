import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { FacultyResponse } from "@/types/Interface";
import { useQueryClient } from "@tanstack/react-query";
import { CircleArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CoaepBaseColumn } from "./CoaepBaseColumn";
import { DataTable } from "@/components/ui/datatable";
import COTab from "./COTab";

export default function CoaepTabContent() {
  const navigate = useNavigate();
  const { courseID } = useParams<{ courseID: string }>();
  const queryClient = useQueryClient();
  const faculty = queryClient.getQueryData<FacultyResponse>(["courses"]);
  const courses = faculty?.faculty?.Courses;
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    const course = sessionStorage.getItem("selectedCourse")
    const selectedCourse = course ? JSON.parse(course) : null
    setCourseName(selectedCourse.Course.Course_Name.toUpperCase() || "");
  }, [courseID, courses]);
  return (
    <>
      <TabsContent value="co">
        <COTab courseName={courseName} navigate={navigate} />
      </TabsContent>
      <TabsContent value="ilo">
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
      </TabsContent>
      <TabsContent value="at">
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
              header: "Intended Learning Outcomes",
            },
            {
              header: "Assessment Tool",
            },
          ]}
          data={[]}
        />
      </TabsContent>
      <TabsContent value="pt">
        <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937] mb-6">
          <Button variant="ghost" onClick={() => navigate("/courses")}>
            <CircleArrowLeft />
          </Button>
          {courseName}
        </div>
        <DataTable
          resource="Course Outcomes"
          columns={[
            ...CoaepBaseColumn,
            {
              header: "Intended Learning Outcomes",
            },
            {
              header: "Assessment Tool",
            },
            {
              header: "Performance Target",
            },
          ]}
          data={[]}
        />
      </TabsContent>
      <TabsContent value="final">
        <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937] mb-6">
          <Button variant="ghost" onClick={() => navigate("/coaep/courses")}>
            <CircleArrowLeft />
          </Button>
          {courseName}
        </div>
        <DataTable
          resource="Course Outcomes"
          columns={[
            ...CoaepBaseColumn,
            {
              header: "Intended Learning Outcomes",
            },
            {
              header: "Assessment Tool",
            },
            {
              header: "Performance Target",
            },
          ]}
          data={[]}
        />
      </TabsContent>
    </>
  );
}
