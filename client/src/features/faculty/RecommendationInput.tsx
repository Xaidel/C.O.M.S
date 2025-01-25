import { Input } from "@/components/ui/input";
import { useState } from "react";

interface RecommendationInputProps {
  initialRecommendation: string;
  sectionID: number;
  ilo_id: number;
  isPassed: boolean,
  handleRecommendationChange: (
    newValue: string,
    ilo_id: number,
    sectionID: number
  ) => void;
}

export default function RecommendationInput({
  initialRecommendation,
  sectionID,
  ilo_id,
  isPassed,
  handleRecommendationChange,
}: RecommendationInputProps) {
  const [recommendation, setRecommendation] = useState(initialRecommendation || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setRecommendation(newValue);
    handleRecommendationChange(newValue, ilo_id, sectionID);
  };

  return (
    <>
      {isPassed ? (
        <Input
          type="text"
          disabled
          className="w-full h-full border-none bg-transparent"
          value={recommendation || ""}
        />
      ) : (
        <Input
          type="text"
          placeholder="Input Recommendation"
          className="w-full text-center h-full text-xs border-none bg-transparent"
          value={recommendation || ""}
          onChange={handleInputChange}
        />
      )}

    </>
  );
}
