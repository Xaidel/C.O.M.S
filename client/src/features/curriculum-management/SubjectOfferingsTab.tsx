import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Prospectus from "./Prospectus";
import Offerings from "./Offerings";

export default function SubjectOfferingsTab() {
  return (
    <>
      <Tabs defaultValue="offerings">
        <TabsList className="grid w-[30rem] grid-cols-2">
          <TabsTrigger value="prospectus">Prospectus</TabsTrigger>
          <TabsTrigger value="offerings">Subject Offerings</TabsTrigger>
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