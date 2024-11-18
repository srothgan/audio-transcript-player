"use client"
import { useState, useRef, useEffect} from "react";
import {  FaTrashAlt } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { hasTouchScreen } from "@/utils/hasTouch";
import Transcript from "./Transcript";

function TranscriptEditor() {
  const [fileName, setFileName] = useState(null); // To store the file name
  const [newFileName, setNewFileName] = useState(null); // To store the new file name
  const [fileContent, setFileContent] = useState(""); // To display and edit text
  const fileInputRef = useRef(null); 
  const isTouchScreen = hasTouchScreen();

  const { toast } = useToast();

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      setFileName(file.name);
      setNewFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result.replace(/\r\n|\r/g, "\n"); // Normalize line endings to \n
        setFileContent(content);
      };
      reader.readAsText(file);
    } else {
      toast({
        variant: "destructive",
        description: "Please upload a valid .txt file.",
      })
    }
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
        <div>
          {isTouchScreen && (
          <div className="w-full px-3 flex items-start justify-start xl:hidden text-xs text-gray-500 mb-2">
            <span>The sync scroll of line numbers and textarea doesnt work well on touch screens.</span>
          </div>
          )}
      </div>
       )}
      {/* Txt Editor */}
      {fileName && (
        <section className="w-full px-3 md:px-6 flex flex-col">
          <Transcript fileContent={fileContent} fileName={fileName}/>
        </section>
    )}      
    </div>
  );
}

export default TranscriptEditor;
