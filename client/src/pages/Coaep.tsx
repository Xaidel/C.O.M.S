import AppLabel from "@/components/ui/applabel";
import { useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoaepTabContent from "@/features/faculty/CoaepTabContent";

export default function Coaep() {
  const { state } = useSidebar();
  return (
    <>
      <div>
        <AppLabel currentPage="Course Outcome Statements" />
      </div>
      <Tabs defaultValue="co" className="w-full flex flex-col justify-center">
        <TabsList className="h-auto p-0 bg-transparent gap-8">
          {[
            { value: "co", label: "Course Outcome" },
            { value: "ilo", label: "Intended Learning Outcome" },
            { value: "at", label: "Assessment Tool" },
            { value: "pt", label: "Performance Target" },
            { value: "final", label: "COAEP Preview" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`relative bg-transparent h-auto px-0 pb-4 pt-10 data-[state=active]:bg-transparent font-normal text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none 
                after:absolute after:z-20 ${state === "expanded" && "after:z-1"} after:border-2 after:left-1/2 after:top-0 after:h-[25px] after:w-[25px] after:-translate-x-1/2 after:rounded-full after:bg-[#F8F8F8] after:border-[#CBD2DB] data-[state=active]:after:border-4 data-[state=active]:after:border-[#40454E]
                before:absolute before:z-10 ${state === "expanded" && "before:z-0"} before:top-[0.35rem] before:left-[-40%] before:right-[-40%] before:h-[13px] before:min-w-full before:rounded-md before:bg-[#CBD2DB]`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <CoaepTabContent />
      </Tabs>
    </>
  );
}
