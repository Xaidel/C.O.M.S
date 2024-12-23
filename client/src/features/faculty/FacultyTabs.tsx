import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClassList from "./ClassList"
import Coaep from "./Coaep"

export default function FacultyTabs() {
  return (
    <>
      <Tabs defaultValue="classlist" className="w-full">
        <TabsList className="grid w-[50rem] grid-cols-2">
          <TabsTrigger value="classlist">Class List</TabsTrigger>
          <TabsTrigger value="coaep">CO Assessment and Evaluation Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="classlist">
          <ClassList />
        </TabsContent>
        <TabsContent value="coaep">
          <Coaep />
        </TabsContent>
      </Tabs>
    </>
  )
}
