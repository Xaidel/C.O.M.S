import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClassList from "./ClassList"
import Coaep from "./Coaep"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ILOCriteria from "../course-management/ILOCriteria"
import { FileSpreadsheet, ListOrdered, Users } from "lucide-react"

export default function FacultyTabs() {
  return (
    <>
      <Tabs defaultValue="coaep" className="w-full">
        <div className="flex justify-between">
          <TabsList className="grid w-[30rem] grid-cols-2">
            <TabsTrigger value="classlist"><Users size={20} className="mr-1" />Class List</TabsTrigger>
            <TabsTrigger value="coaep"><FileSpreadsheet size={20} className="mr-1" />COAEP</TabsTrigger>
          </TabsList>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"><ListOrdered size={20} className="mr-1" />ILO Criteria</Button>
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
