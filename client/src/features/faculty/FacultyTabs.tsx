import { DataTable } from "@/components/ui/datatable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FacultyTabs() {
  return (
    <>
      <Tabs defaultValue="classlist" className="w-full">
        <TabsList className="grid w-[50rem] grid-cols-2">
          <TabsTrigger value="classlist">Class List</TabsTrigger>
          <TabsTrigger value="coaep">CO Assessment and Evaluation Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="classlist">
          <DataTable columns={[{ header: "Student Number" }, { header: "Student Name" }]} data={[]} resource="Student" />
        </TabsContent>
      </Tabs>
    </>
  )
}
