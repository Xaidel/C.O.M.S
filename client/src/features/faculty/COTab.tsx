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
import { CoaepBaseColumn } from "./CoaepBaseColumn";
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
  const [openLevel, setOpenLevel] = useState(false);
  const addCoForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: "",
      statement: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
    <>
      <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937] mb-6">
        <Button variant="ghost" onClick={() => navigate("/courses")}>
          <CircleArrowLeft />
        </Button>
        {courseName}
      </div>
      <DataTable
        resource="Course Outcomes"
        columns={CoaepBaseColumn}
        data={[]}
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
