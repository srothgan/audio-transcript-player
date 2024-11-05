"use client"
import { useState, useEffect } from "react";
import { FaRegSave, FaFileDownload, FaTrashAlt  } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

function TextFileUploader() {
  const [fileName, setFileName] = useState(null); // To store the file name
  const [fileContent, setFileContent] = useState(""); // To display and edit text
  const [originalContent, setOriginalContent] = useState(""); // To track original text
  const [isModified, setIsModified] = useState(false); // To indicate unsaved changes

  const { toast } = useToast();

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setFileContent(reader.result);
        setOriginalContent(reader.result); // Set original content for comparison
        setIsModified(false); // No changes after initial load
      };
      reader.readAsText(file);
    } else {
      toast({
        variant: "destructive",
        description: "Please upload a valid .txt file.",
      })
    }
  };

  // Track content changes
  const handleContentChange = (event) => {
    setFileContent(event.target.value);
    setIsModified(event.target.value !== originalContent); // Check if changes are unsaved
  };

  // Save content and reset unsaved changes indicator
  const handleSave = () => {
    setOriginalContent(fileContent); // Set current content as the saved state
    setIsModified(false); // Mark as saved
    toast({
      variant: "success",
      description: "Changes saved!",
    })
  };

  // Download the edited content as a .txt file
  const handleDownload = () => {
    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName || "download.txt"; // Use original or default name
    link.click();
    URL.revokeObjectURL(link.href); // Clean up URL after download
  };

  const handleDeleteTxt = () =>{
    setFileName(null)
    setFileContent("")
    setOriginalContent("")
    setIsModified(false)
  }

  return (
    <div className="flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg shadow-md mt-4 lg:mt-0">
      {/* Header */}
      <div className='w-full bg-gradient-to-r from-slate-600 to-slate-800 text-white px-2 py-1 rounded-t-lg'>
        <p className="text-xl font-semibold tracking-wide italic">Transcript Editor</p>
      </div>

      {/* File Upload */}
      <div className="flex flex-col w-full px-3 md:px-6 py-3">
        <label htmlFor="audio" className="font-semibold">Upload Txt File:</label>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full py-2">
            <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {fileName && (
            <button
                type="button"
                onClick={handleDeleteTxt}
                className="px-2 py-1 bg-slate-200 text-red-600 rounded-md transition flex justify-center items-center"
                aria-label="Delete Txt"
            >   
                <p className='flex font-bold md:hidden mr-2'>Remove Transcript</p>
                <FaTrashAlt size={18} />
            </button>
            )}
        </div>
       </div>

      {/* Txt Editor */}
      {fileName && (
        <section className="w-full px-3 md:px-6 flex flex-col">
            <div className="w-full flex flex-row items-center justify-between">
                {/* Filename Display */}
                <div className="flex items-baseline text-white font-bold bg-gray-700 px-2 py-1 h-8 w-fit">
                    <div className="font-bold ">{fileName}</div>
                    {isModified && <div className="w-3 h-3 bg-white rounded-full ml-2" />}
                </div>
                
        
                <div className="flex h-8">
                    <button
                    onClick={handleSave}
                    type="button"
                    disabled={!isModified} // Disable if no changes
                    className={"p-2 text-white bg-gray-700 hover:bg-gray-400 border-r border-gray-300"}
                    >
                        <FaRegSave/>
                    </button>
                    <button
                    onClick={handleDownload}
                    type="button"
                    disabled={!fileContent} // Disable if no file content to download
                    className={"p-2 text-white font-bold bg-gray-700 hover:bg-gray-400 border-l border-gray-300"}
                    >
                        <FaFileDownload/>
                    </button>
                </div>
            </div>
            {/* Text Editor */}
            <textarea
                value={fileContent}
                onChange={handleContentChange}
                placeholder="Upload a .txt file to start editing..."
                rows={15}
                className="w-full p-2 border-2 border-gray-700 resize-none mb-4"
            />
        </section>
    )}      
    </div>
  );
}

export default TextFileUploader;
