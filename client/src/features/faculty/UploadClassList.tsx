import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useUploadClassList } from "./useUploadClassList";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function UploadClassList() {
  const queryClient = useQueryClient()
  const { courseID } = useParams<{ courseID: string }>()
  const [modalOpen, setModalOpen] = useState(false)
  const [fileName, setFileName] = useState<String>("No file selected")
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { mutate: UploadClassList } = useUploadClassList()
  const parsedCourseID = parseInt(courseID || "", 10)
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

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (file) {
      UploadClassList({ file, courseID: parsedCourseID }, {
        onSuccess: (data) => {
          toast({
            variant: "success",
            duration: 3000,
            title: "Sucess",
            description: data?.message
          })
          setModalOpen(false)
          setFile(null)
          setFileName("No file selected")
          queryClient.invalidateQueries({ queryKey: [`${parsedCourseID}-students`] })
        },
        onError: (err) => {
          console.log(err)
          toast({
            variant: "destructive",
            duration: 3000,
            title: "Error",
            description: err.message
          })
          setModalOpen(false)
          setFile(null)
          setFileName("No file selected")
        }
      })
    }

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
      <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-[#3C444E] hover:bg-gray-50">
            <Upload className="mr-2 h-4 w-4" />Upload ClassList
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-red-500 text-2xl">
              Upload Class List
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-3 items-center">
            <input ref={inputRef} id="file-input" type="file" accept=".csv" onChange={handleFileChange} className="sr-only" />
            <Button type="button" onClick={handleButtonClick} className="w-24">Browse</Button>
            <span className="text-sm text-muted-foreground">{fileName}</span>
          </div>
          <div className="flex mt-5 gap-3">
            <DialogClose asChild>
              <Button type="button" onClick={onCancel} variant="outline" className="flex-1">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmit} className="flex-1 bg-[#3C444E] hover:bg-[#4B5563] text-white-mainBG">Upload</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
