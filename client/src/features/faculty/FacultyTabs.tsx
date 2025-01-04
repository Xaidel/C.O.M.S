import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClassList from "./ClassList"
import Coaep from "./Coaep"

export default function FacultyTabs() {
  return (
    <>
      <Tabs defaultValue="coaep" className="w-full">
        <TabsList className="grid w-[30rem] grid-cols-2">
          <TabsTrigger value="classlist">Class List</TabsTrigger>
          <TabsTrigger value="coaep">COAEP</TabsTrigger>
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
