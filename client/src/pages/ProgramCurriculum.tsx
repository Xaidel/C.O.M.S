import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CurriculumColumn } from "@/features/curriculum-management/CurriculumColumn";
import { useCurriculumByProgram } from "@/features/curriculum-management/useCurriculum";
import { Curriculum, DepartmentResponse } from "@/types/Interface";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronRight, CircleArrowLeft, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProgramCurriculum() {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [fileName, setFileName] = useState<String>("No file selected ")
  const [file, setFile] = useState<File | null>(null)
  const { programID } = useParams<{ programID: string }>()
  const parsedProgID = parseInt(programID || "0", 10)
  const queryClient = useQueryClient()
  const deptData = queryClient.getQueryData<DepartmentResponse>(["department"])
  const currentProgram = deptData?.department?.Programs.find((program) => program.ID === parsedProgID)
  const { isLoading, response, error } = useCurriculumByProgram(currentProgram?.ID || 0)
  const curriculums: Curriculum[] = response?.curriculums || []
  if (isLoading) return;
  if (error) return;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
    } else {
      setFile(null)
      setFileName("No file selected")
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const onCancel = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
    }
    setFile(null)
    setFileName("No file selected")
  }
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
          <Button className="mt-5 border-[#3C444E]"><Upload className="mr-2 h-4 w-4" /> Upload Curriculum</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-red-500 text-2xl">
              Upload Curriculum
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-3 items-center">
            <input ref={inputRef} id="file-input" type="file" accept=".csv" className="sr-only" onChange={handleFileChange} />
            <Button type="button" onClick={handleButtonClick}>Browse</Button>
            <span className="text-sm text-muted-foreground">{fileName}</span>
          </div>
          <div className="flex mt-5 gap-3">
            <DialogClose asChild>
              <Button type="button" onClick={onCancel} variant="outline" className="flex-1">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => { console.log(file) }} className="flex-1 bg-[#3C444E] hover:bg-[#4B5563] text-white-mainBG">Upload</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
