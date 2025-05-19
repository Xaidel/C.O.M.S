import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import {
  Check,
  ChevronsUpDown,
  CircleArrowLeft,
  PlusIcon,
  Upload,
} from "lucide-react";
import { NavigateFunction } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";
import { useCOAEPByCourse } from "./useCOAEPByCourse";
import { useAddCOAEP } from "./useAddCOAEP";
import { useQueryClient } from "@tanstack/react-query";
import { CurrentPeriodResponse } from "@/types/Interface";
import { useAddCO } from "./useAddCO";
import { Badge } from "@/components/ui/badge";

interface TabProps {
  courseName: string;
  navigate: NavigateFunction;
}

const formSchema = z.object({
  level: z
    .string({ required_error: "Please select the level of the outcome" })
    .min(2, "Please select a level"),
  statement: z
    .string()
    .min(10, "That statement is too short!!")
    .max(500, "That statement is too long!!"),
});

const levels = [
  { label: "I-Introductory", value: "Introductory" },
  { label: "E-Enabling", value: "Enabling" },
  { label: "D-Demonstrative", value: "Demonstrative" },
];

export default function COTab({ courseName, navigate }: TabProps) {
  const queryClient = useQueryClient()
  const currentPeriod: CurrentPeriodResponse | undefined = queryClient.getQueryData(["current-period"])
  let periodID
  const [openLevel, setOpenLevel] = useState(false);
  const selectedCourse = sessionStorage.getItem("selectedCourse")
  const course = JSON.parse(selectedCourse || "")
  const parsedCourseID = course.Course.ID
  const { data: coaep, isLoading, error } = useCOAEPByCourse(parsedCourseID)
  const { mutate: addCOAEP, isCreating } = useAddCOAEP()
  const { mutate: addCO } = useAddCO()
  const addCoForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: "",
      statement: "",
    },
  });

  const handleGenerate = async () => {
    periodID = currentPeriod?.current_period ? currentPeriod.current_period?.ID : 0
    const courseName = course.Course.Course_Name
    addCOAEP({ courseID: parsedCourseID, periodID, courseName }, {
      onError: (e) => {
        console.log(e)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`coaep-${parsedCourseID}`] })
      }
    })
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    const planID = coaep?.coaep?.ID || 0
    addCO({ level: data.level, statement: data.statement, planID }, {
      onError: (e) => {
        console.log(e)
      },
      onSuccess: () => {
        console.log("Success")
        queryClient.invalidateQueries({ queryKey: [`coaep-${parsedCourseID}`] })
      }
    })
  }
  if (!coaep) return <div className="h-[40rem] w-full flex items-center justify-center">
    <Button onClick={handleGenerate}>
      {(isCreating) ? "Generating COAEP" : "Generate COAEP"}
    </Button>
  </div>
  if (isLoading) return
  if (error) return
  return (
    <>
      <div className="flex justify-between mb-6 items-center">
        <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937]">
          <Button variant="ghost" onClick={() => navigate("/coaep/course")}>
            <CircleArrowLeft />
          </Button>
          {courseName}
        </div>
      </div>
      <DataTable
        resource="Course Outcomes"
        columns={[{
          header: "No.",
          cell: ({ row }) => (
            <div>{row.index + 1}</div>
          )
        }, {
          header: "Statement",
          cell: ({ row }) => {
            const level = row.original.Level.charAt(0)
            let color;
            switch (level) {
              case "Introductory": {
                color = "#C8D2DA"
                break;
              }
              case "Enabling": {
                color = "#ACB9C3"
                break
              }
              case "Demonstrative": {
                color = "#8E9CA7"
                break
              }
            }
            return (
              <div className="flex gap-2">
                <Badge className="text-white" style={{ backgroundColor: color }}>{level}</Badge>
                <p>{row.original.Statement}</p>
              </div >
            )
          }
        }]}
        data={coaep.coaep.CourseOutcomes}
      />
      <div className="mt-4 flex justify-start gap-3">
        <Button variant="outline">
          <Upload size={20} /> <span className="ml-1">Upload CSV</span>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon size={20} />{" "}
              <span className="ml-1">Create Course Outcomes</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-[#DC2626] text-xl">
                Add Course Outcomes
              </DialogTitle>
              <DialogDescription>
                Create a Course Outcome Statement for{" "}
                <span className="font-bold">{courseName}</span>
              </DialogDescription>
            </DialogHeader>
            <Form {...addCoForm}>
              <form
                onSubmit={addCoForm.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <div>
                  <FormField
                    control={addCoForm.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-lg">
                          Level
                        </FormLabel>
                        <Popover open={openLevel} onOpenChange={setOpenLevel}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                {...field}
                                className={cn(
                                  "min-w-full min-h-12 justify-between font-sans",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? levels.find(
                                    (level) => level.value === field.value,
                                  )?.label
                                  : "Select CO level"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[27.6rem] p-0">
                            <Command>
                              <CommandList>
                                <CommandEmpty>No level selected</CommandEmpty>
                                <CommandGroup>
                                  {levels.map((level) => (
                                    <CommandItem
                                      value={level.label}
                                      key={level.value}
                                      onSelect={() => {
                                        addCoForm.setValue(
                                          "level",
                                          level.value,
                                        );
                                        setOpenLevel(false);
                                      }}
                                    >
                                      {level.label}{" "}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          level.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={addCoForm.control}
                    name="statement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-lg">
                          Course Outcome Statement
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Input CO Statement"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-3">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="flex-1"
                      type="button"
                      onClick={() => addCoForm.reset()}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button className="flex-1" type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
