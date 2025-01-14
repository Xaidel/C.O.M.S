import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { DataTable } from "@/components/ui/datatable";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CurriculumColumn } from "@/features/curriculum-management/CurriculumColumn";
import { useCurriculumByProgram } from "@/features/curriculum-management/useCurriculum";
import { cn } from "@/lib/utils";
import { Curriculum, DepartmentResponse } from "@/types/Interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronRight, ChevronsUpDown, CircleArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  id: z
    .string()
    .min(2, "Please input a proper Curriculum ID")
    .max(2, "Curriculum ID is too long"),
  revision_number: z
    .number()
    .min(1, "Revision number is invalid")
    .max(1000, "Revision Number too long"),
  effectivity_sem: z
    .string()
    .min(1, "Semester invalid")
    .max(20, "Semester invalid"),
  effectivity_sy: z
    .string()
    .min(4, "Year invalid use this format(2223 = 2022-2023)")
    .max(4, "Year invalid use this format(2223 = 2022-2023)"),
  cmo_reference: z
    .string()
    .min(2, "Please input the CMO Reference")
    .max(1000, "Reference too long")
})

const semester = [
  { label: "Summer", value: "summer" },
  { label: "First Semester", value: "first_sem" },
  { label: "Second Semester", value: "second_sem" }
]

export default function ProgramCurriculum() {
  const [openSemester, setOpenSemester] = useState(false)
  const navigate = useNavigate()
  const { programID } = useParams<{ programID: string }>()
  const parsedProgID = parseInt(programID || "0", 10)
  const queryClient = useQueryClient()
  const deptData = queryClient.getQueryData<DepartmentResponse>(["department"])
  const currentProgram = deptData?.department?.Programs.find((program) => program.ID === parsedProgID)
  const { isLoading, response, error } = useCurriculumByProgram(currentProgram?.ID || 0)
  const curriculums: Curriculum[] = response?.curriculums || []
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      revision_number: 0,
      effectivity_sem: "",
      effectivity_sy: "",
      cmo_reference: ""
    }
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  if (isLoading) return;
  if (error) return;

  return (
    <>
      <div>
        <AppLabel currentPage="Program Curriculum" />
      </div>
      <div className="flex justify-start gap-1 items-center text-3xl font-bold text-[#1F2937] mb-6">
        <Button
          variant="ghost"
          onClick={() => {
            navigate(-1)
          }}
        >
          <CircleArrowLeft className="text-2xl" />
        </Button>
        {`${currentProgram?.Program_Code} Curriculum`}
      </div>
      <DataTable resource="Curriculums"
        columns={[...CurriculumColumn, {
          id: "action",
          header: "",
          cell: () => {
            return (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost">
                        <ChevronRight />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Course Offerings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider >
              </>
            )
          }
        }]}
        data={curriculums}
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-5 border-[#3C444E]"><Plus className="mr-2 h-5 w-5" /> Add Curriculum</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-red-500 text-2xl">
              Add New Curriculum
            </DialogTitle>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Curriculum ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Curriculum ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                >
                </FormField>
                <FormField
                  control={form.control}
                  name="revision_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Revision Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Revision Number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                >
                </FormField>
                <FormField
                  control={form.control}
                  name="effectivity_sem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Effectivity Sem</FormLabel>
                      <Popover open={openSemester} onOpenChange={setOpenSemester}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              {...field}
                              className={cn("min-w-full min-h-12 justify-between font-sans", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? semester.find((sem) => sem.value === field.value)?.label : "Select Semester"}
                              <ChevronsUpDown className="m-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[27.6rem] p-0">
                          <Command>
                            <CommandList>
                              <CommandEmpty>No Selected Semester</CommandEmpty>
                              <CommandGroup>
                                {semester.map((sem) => (
                                  <CommandItem
                                    value={sem.label}
                                    key={sem.value}
                                    onSelect={() => {
                                      form.setValue("effectivity_sem", sem.value)
                                      setOpenSemester(false)
                                    }}
                                  >
                                    {sem.label}
                                    <Check className={cn(
                                      "m1-auto",
                                      sem.value === field.value ? "opacity-100" : "opacity-0"
                                    )} />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                >
                </FormField>
                <FormField
                  control={form.control}
                  name="effectivity_sy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Effectivity S/Y</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Effectivity S/Y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                >
                </FormField>
                <FormField
                  control={form.control}
                  name="cmo_reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CMO Reference</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter CMO Reference"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                >
                </FormField>
                <div className="flex justify-center gap-3 mt-5">
                  <DialogClose asChild>
                    <Button className="flex-1" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button className="flex-1" type="submit">Add</Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog >
    </>
  )
}
