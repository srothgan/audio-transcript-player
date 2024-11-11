"use client"
import { useState, useRef } from "react";
import { FaRegSave, FaFileDownload, FaTrashAlt, FaListOl   } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import Textarea from "./Textarea";

function TextFileUploader() {
  const [fileName, setFileName] = useState(null); // To store the file name
  const [fileContent, setFileContent] = useState(""); // To display and edit text
  const [originalContent, setOriginalContent] = useState(""); // To track original text
  const [isModified, setIsModified] = useState(false); // To indicate unsaved changes
  const fileInputRef = useRef(null); 
  const [lineNumbersVisible, setLineNumbersVisible] = useState(true);
  const { toast } = useToast();

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result.replace(/\r\n|\r/g, "\n"); // Normalize line endings to \n
        setFileContent(content);
        setOriginalContent(content);
        setIsModified(false);
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
  const handleContentChange = (newContent) => {
    setFileContent(newContent);
    setIsModified(newContent !== originalContent);
  };

  const handleToggleLineNumbers = () => {
    setLineNumbersVisible(!lineNumbersVisible);
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
    if(isModified){
      toast({
        variant: "warn",
        description: "Unsaved changes. Save before downloading.",
      })
      return;
    }
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input to remove the file name
    }
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
            ref={fileInputRef}
            className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {fileName && (
            <button
                type="button"
                onClick={handleDeleteTxt}
                className="hidden px-2 py-1 bg-slate-200 text-red-600 rounded-md transition md:flex justify-center items-center"
                aria-label="Delete Txt"
            >   
                <FaTrashAlt size={18} />
            </button>
            )}
        </div>
       </div>
       {fileName && (
       <div className="w-full px-3 flex items-start justify-start md:hidden h-8 mb-2 space-x-2">
          <button
                type="button"
                onClick={handleDeleteTxt}
                className="px-2 h-8 py-1 bg-slate-200 text-red-600 rounded-md transition flex justify-center items-center"
                aria-label="Delete Txt"
            >   
                <FaTrashAlt size={18} />
            </button>
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
          className={"p-2 text-white font-bold bg-gray-700 hover:bg-gray-400 border-x border-gray-300"}
          >
              <FaFileDownload/>
          </button>
          <button
          onClick={handleToggleLineNumbers}
          type="button"
          className={"p-2 text-white font-bold bg-gray-700 hover:bg-gray-400 border-l border-gray-300"}
          >
            <FaListOl/>
          </button>
      </div>
       )}
      {/* Txt Editor */}
      {fileName && (
        <section className="w-full px-3 md:px-6 flex flex-col">
            <div className="w-full flex flex-row items-center justify-between">
                {/* Filename Display */}
                <div className="flex items-baseline text-white font-bold bg-gray-700 px-2 py-1 h-8 w-fit">
                    <div className="font-bold ">{fileName}</div>
                    {isModified && <div className="w-3 h-3 bg-white rounded-full ml-2" />}
                </div>
                
      
                <div className="hidden md:flex h-8">
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
                    className={"p-2 text-white font-bold bg-gray-700 hover:bg-gray-400 border-x border-gray-300"}
                    >
                        <FaFileDownload/>
                    </button>
                    <button
                    onClick={handleToggleLineNumbers}
                    type="button"
                    className={"p-2 flex items-center text-white font-bold bg-gray-700 hover:bg-gray-400 border-l border-gray-300"}
                    >
                      <FaListOl/>
                    </button>
                </div>
            </div>
            {/* Text Editor */}
            <Textarea
            fileContent={fileContent}
            onContentChange={handleContentChange}
            lineNumbersVisible={lineNumbersVisible}
            style={{ fontFamily: "monospace" }}
          />
        </section>
    )}      
    </div>
  );
}

export default TextFileUploader;
