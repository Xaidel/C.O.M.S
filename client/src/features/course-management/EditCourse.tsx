import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";

export default function EditCourse() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[#3C444E] hover:bg-gray-50">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Course
        </Button>
      </DialogTrigger>


      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-red-500 text-2xl">
          Edit Course
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
