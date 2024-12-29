import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { courseOutcomes } from "@/types/mockCoaep";
export default function Coaep() {
  return (
    <>
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead rowSpan={2} className="border">Student Number</TableHead>
              <TableHead rowSpan={2} className="border">Student Name</TableHead>
              {courseOutcomes.map((co) => (
                <TableHead key={co.id} className="text-center border" colSpan={co.intendedLearningOutcomes.length}>{`CO #${co.id}`}</TableHead>
              ))}
            </TableRow>
            <TableRow>
              {courseOutcomes.map((co) => co.intendedLearningOutcomes.map((index) => (
                <TableHead key={`${co.id}-${index}`} className="text-center border">{`ILO #${index + 1}`}</TableHead>
              )))}
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </>
  )
}
