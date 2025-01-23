import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CurriculumColumn } from "@/features/curriculum-management/CurriculumColumn";
import { useCurriculumByProgram } from "@/features/curriculum-management/useCurriculum";
import { currentUser, Curriculum } from "@/types/Interface";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronRight, ChevronsUpDown, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddCurriculum } from "@/features/curriculum-management/useAddCurriculum";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

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
export default function CurriculumManagement() {
  const navigate = useNavigate();
  const [openSemester, setOpenSemester] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<currentUser>(["current-user"]);
  const programID = currentUser?.role_info.Programs?.[0].ID || 0; //temporary
  const { isLoading, response, error } = useCurriculumByProgram(programID);
  const addCurriculum = useAddCurriculum()

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
    addCurriculum.mutate({ ...data, programID: programID }, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success!",
          description: `Curriculum ${data.id} was added`,
          duration: 3000
        })
        setOpenModal(false)
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Error!",
          description: err.message,
          duration: 3000
        })
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [`${programID}-curriculum`] })
      }
    })
  }
  if (isLoading) return;
  if (error) return;
  const currs: Curriculum[] = response?.curriculums || [];
  return (
    <>
      <div>
        <AppLabel currentPage="Curriculum Management" />
      </div>
      <h1 className="text-3xl font-bold text-[#1F2937] mb-3">
        List of Curriculums
      </h1>
      <DataTable
        resource="Curriculum"
        columns={[
          ...CurriculumColumn,
          {
            id: "action",
            cell: ({ row }) => {
              const id = row.original.CurrID;
              return (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          navigate(`/curriculums/${id}/courses`);
                        }}
                      >
                        <ChevronRight />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Courses</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            },
          },
        ]}
        data={currs}
      />
      <Dialog open={openModal} onOpenChange={setOpenModal}>
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
  );
}
