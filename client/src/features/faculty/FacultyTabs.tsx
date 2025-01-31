import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClassList from "./ClassList"
import Coaep from "./Coaep"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ILOCriteria from "../course-management/ILOCriteria"

export default function FacultyTabs() {
  return (
    <>
      <Tabs defaultValue="coaep" className="w-full">
        <div className="flex justify-between">
          <TabsList className="grid w-[30rem] grid-cols-2">
            <TabsTrigger value="classlist">Class List</TabsTrigger>
            <TabsTrigger value="coaep">COAEP</TabsTrigger>
          </TabsList>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">ILO Criteria</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[90%] min-h-[85%] max-h-[80%] overflow-y-scroll">
              <DialogHeader>
                <DialogTitle className="text-2xl">ILO Criteria</DialogTitle>
                <DialogDescription>Expected points students should attain</DialogDescription>
              </DialogHeader>
              <ILOCriteria />
            </DialogContent>
          </Dialog>
        </div>
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
