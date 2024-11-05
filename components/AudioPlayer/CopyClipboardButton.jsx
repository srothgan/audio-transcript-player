import {  FaCopy} from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

export default function CopyClipboardButton({hour, min, sec}){

  const { toast } = useToast()

    const copyToClipboard = () => {
        const formattedTime = `[${hour}:${min}:${sec}]`;
      
        // Use navigator.clipboard if available
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(formattedTime)
            .then(() => toast({
              variant: "success",
              description: "Copied to Clipboard.",
            }))
            .catch((err) => console.error("Clipboard copy failed:", err));
        } else {
          // Fallback for mobile browsers: create a temporary input
          const tempInput = document.createElement("input");
          tempInput.value = formattedTime;
          document.body.appendChild(tempInput);
          tempInput.select();
          tempInput.setSelectionRange(0, tempInput.value.length); // For iOS compatibility
      
          try {
            document.execCommand("copy");
            toast.success("Copied timestamp to Clipboard successfully!");
          } catch (err) {
            console.error("Fallback copy failed:", err);
            toast.error("Failed to copy timestamp to Clipboard.");
          } finally {
            document.body.removeChild(tempInput);
          }
        }
    };
    return(
        <button
            type="button"
            onClick={copyToClipboard}
            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            aria-label="Copy current time to clipboard"
        >
            <FaCopy />
        </button>
    )
}