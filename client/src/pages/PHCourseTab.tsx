import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLabel from "@/components/ui/applabel";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";
import CourseReport from "./CourseReport";
import CourseStudentProfile from "./CourseStudentProfile";

export default function PHCourseTab() {
  const navigate = useNavigate()
  return (
    <>
      <div>
        <AppLabel currentPage="Class Profile" />
      </div>
      <div className="flex justify-start gap-1 items-center text-3xl font-bold text-[#1F2937] mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <CircleArrowLeft className="text-2xl" />
        </Button>
        Class Profile
      </div>
      <Tabs defaultValue="report">
        <TabsList className="grid w-[30rem] grid-cols-2">
          <TabsTrigger value="report">Report</TabsTrigger>
          <TabsTrigger value="profile">Student Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="report">
          <CourseReport />
        </TabsContent>
        <TabsContent value="profile">
          <CourseStudentProfile />
        </TabsContent>
      </Tabs>
    </>
  )
}
