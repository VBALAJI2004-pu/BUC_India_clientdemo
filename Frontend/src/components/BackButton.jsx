import { ArrowLeft } from "lucide-react";
import { useSmartBack } from "../utils/navigation";

const BackButton = ({ label = "Back", className = "" }) => {
  const handleBack = useSmartBack("/");

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-steel-dim hover:text-copper transition-colors ${className}`}
    >
      <ArrowLeft size={14} />
      {label}
    </button>
  );
};

export default BackButton;
