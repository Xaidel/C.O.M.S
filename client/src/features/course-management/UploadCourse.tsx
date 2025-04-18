import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useUploadCourse } from "./useUploadCourse";
import { toast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function UploadCourse() {
  const [fileName, setFileName] = useState<string>("No File Selected")
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { mutate: uploadCourse } = useUploadCourse()
  const [modalOpen, setModalOpen] = useState(false)
  const { currID } = useParams<{ currID: string }>()
  const curr = currID || ""
  const queryClient = useQueryClient()
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
    } else {
      setFile(null)
      setFileName("No File Selected")
    }

  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (file) {
      uploadCourse({ file, currID: curr }, {
        onSuccess: (data) => {
          toast({
            variant: "success",
            duration: 3000,
            title: "Success",
            description: data?.message
          })
          setModalOpen(false)
          setFile(null)
          setFileName("No File Selected")
          queryClient.invalidateQueries({ queryKey: [`curriculum-${currID}`] })
        },
        onError: (err) => {
          toast({
            variant: "destructive",
            duration: 3000,
            title: "Error",
            description: err.message
          })
          setModalOpen(false)
          setFile(null)
          setFileName("No File Selected")
        }
      })
    } else {
      console.log("No File Selected")
    }
  }

  const onCancel = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    setFile(null)
    setFileName("No File Selected")
  }
  return (
    <Dialog open={modalOpen} onOpenChange={() => { setModalOpen(!modalOpen) }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[#3C444E] hover:bg-gray-50">
          <Upload className="mr-2 h-4 w-4" />
          Upload Course
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-red-500 text-2xl">
            Upload Course
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex gap-3 items-center">
            <input ref={inputRef} id="file-input" type="file" accept=".csv" onChange={handleFileChange} className="sr-only" />
            <Button type="button" onClick={handleButtonClick} className="w-24">Browse</Button>
            <span className="text-sm text-muted-foreground ">{fileName}</span>
          </div>
          <div className="flex mt-5 gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button></DialogClose>
            <Button type="submit" onClick={onSubmit} className=" flex-1 bg-[#3C444E] hover:bg-[#4B5563] text-white-mainBG ">
              Upload
            </Button></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
