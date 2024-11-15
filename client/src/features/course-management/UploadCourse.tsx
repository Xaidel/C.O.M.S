import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Upload } from "lucide-react";

export default function UploadCourse() {
  return (
    <Dialog>
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

        <div className="space-y-6">
          <input
            type="file"
            accept=".csv"
            className="p-2  rounded-md"
          />

          <div className="flex gap-3">
          <Button
              type="submit"
              className="flex-1 bg-[#3C444E] hover:bg-[#4B5563] !text-white"
            >
              Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
