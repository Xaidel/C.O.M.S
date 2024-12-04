import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { FacultyResponse } from "@/types/Interface";
import { useQueryClient } from "@tanstack/react-query";
import { CircleArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CoaepTabContent() {
  const navigate = useNavigate();
  const { courseID } = useParams<{ courseID: string }>();
  const queryClient = useQueryClient();
  const faculty = queryClient.getQueryData<FacultyResponse>(["courses"]);
  const courses = faculty?.faculty?.Courses;
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    const parsedCourseID = parseInt(courseID || "", 10);
    const selectedCourse = courses?.find(
      (course) => course.ID === parsedCourseID,
    );
    setCourseName(selectedCourse?.Course_Name.toUpperCase() || "");
  }, [courseID, courses]);

  return (
    <>
      <TabsContent value="co">
        <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937] mb-6">
          <Button variant="ghost" onClick={() => navigate("/courses")}>
            <CircleArrowLeft />
          </Button>
          {courseName}
        </div>
      </TabsContent>
      <TabsContent value="ilo">
        <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937] mb-6">
          <Button variant="ghost" onClick={() => navigate("/courses")}>
            <CircleArrowLeft />
          </Button>
          {courseName}
        </div>
      </TabsContent>
      <TabsContent value="at">
        <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937] mb-6">
          <Button variant="ghost" onClick={() => navigate("/courses")}>
            <CircleArrowLeft />
          </Button>
          {courseName}
        </div>
      </TabsContent>
      <TabsContent value="pt">
        <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937] mb-6">
          <Button variant="ghost" onClick={() => navigate("/courses")}>
            <CircleArrowLeft />
          </Button>
          {courseName}
        </div>
      </TabsContent>
      <TabsContent value="final">
        <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937] mb-6">
          <Button variant="ghost" onClick={() => navigate("/courses")}>
            <CircleArrowLeft />
          </Button>
          {courseName}
        </div>
      </TabsContent>
    </>
  );
}
