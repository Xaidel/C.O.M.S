import AppLabel from "@/components/ui/applabel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Coaep() {
  return (
    <>
      <div>
        <AppLabel currentPage="Course Outcome Assessment and Evaluation Plan" />
      </div>
      <Tabs defaultValue="co" className="w-full flex justify-center">
        <TabsList className="h-auto p-0 bg-transparent gap-8">
          {[
            { value: "co", label: "Course Outcome" },
            { value: "ilo", label: "Intended Learning Outcome" },
            { value: "at", label: "Assessment Tool" },
            { value: "pt", label: "Performance Target" },
            { value: "final", label: "Assessment Plan" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative h-auto px-0 pb-4 pt-10 data-[state=active]:bg-transparent font-normal text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none 
                after:absolute after:z-20 after:border-2 after:left-1/2 after:top-0 after:h-[25px] after:w-[25px] after:-translate-x-1/2 after:rounded-full after:bg-[#F8F8F8] after:border-[#CBD2DB] data-[state=active]:after:border-4 data-[state=active]:after:border-[#40454E]
                before:absolute before:z-10 before:top-[0.35rem] before:left-[-50%] before:right-[-50%] before:h-[13px] before:min-w-full before:rounded-md before:bg-[#CBD2DB]"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
}
