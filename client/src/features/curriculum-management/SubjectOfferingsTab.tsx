import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Prospectus from "./Prospectus";
import Offerings from "./Offerings";
import { Book, BookOpen } from "lucide-react";

export default function SubjectOfferingsTab() {
  return (
    <>
      <Tabs defaultValue="offerings">
        <TabsList className="grid w-[30rem] grid-cols-2">
          <TabsTrigger value="prospectus"><BookOpen size={20} className="mr-1" />Curriculum Courses</TabsTrigger>
          <TabsTrigger value="offerings"><Book size={20} className="mr-1" />Course Offerings</TabsTrigger>
        </TabsList>
        <TabsContent value="prospectus">
          <Prospectus />
        </TabsContent>
        <TabsContent value="offerings">
          <Offerings />
        </TabsContent>
      </Tabs>
    </>
  )
}
