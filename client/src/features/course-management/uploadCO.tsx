import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useUploadCO } from "./useUploadCO";
import { useQueryClient } from "@tanstack/react-query";
import { CurrentPeriodResponse } from "@/types/Interface";
import { toast } from "@/hooks/use-toast";

export default function UploadCO() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<String>("No file selected")
  const queryClient = useQueryClient()
  const period: CurrentPeriodResponse = queryClient.getQueryData(["current-period"]) || {}
  const { current_period } = period
  const { mutate: uploadCO } = useUploadCO()
  const onCancel = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
    }
    setFile(null)
    setFileName("No file selected")
  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (file) {
      uploadCO({ file, periodID: current_period?.ID || 0 }, {
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
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile?.name)
    } else {
      setFile(null)
      setFileName("No file selected")
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }
  return (
    <>
      <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
        <DialogTrigger asChild>
          <Button className="flex gap-2 mt-3"><Upload size={22} />Upload COs</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-red-500 text-2xl">
              Upload Course Outcomes Statement
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-3 items-center">
            <input ref={inputRef} id="file-input" type="file" accept=".csv" className="sr-only" onChange={handleFileChange} />
            <Button type="button" onClick={handleButtonClick} className="w-24">Browse</Button>
            <span className="text-sm text-muted-foreground">{fileName}</span>
          </div>
          <div className="flex mt-5 gap-3">
            <DialogClose asChild>
              <Button type="button" onClick={onCancel} variant="outline" className="flex-1">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmit} variant="outline" className="flex-1 bg-[#3C444E] hover:bg-[#4B5563] text-white-mainBG">Upload</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
