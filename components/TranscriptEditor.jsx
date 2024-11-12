"use client"
import { useState, useRef, useEffect} from "react";
import { FaRegSave, FaFileDownload, FaTrashAlt, FaListOl, FaRegEdit } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import Textarea from "./Textarea";
import { hasTouchScreen } from "@/utils/hasTouch";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Search from "./Search";

function TextFileUploader() {
  const [fileName, setFileName] = useState(null); // To store the file name
  const [newFileName, setNewFileName] = useState(null); // To store the new file name
  const [fileContent, setFileContent] = useState(""); // To display and edit text
  const [originalContent, setOriginalContent] = useState(""); // To track original text
  const [isModified, setIsModified] = useState(false); // To indicate unsaved changes
  const fileInputRef = useRef(null); 
  const [lineNumbersVisible, setLineNumbersVisible] = useState(true);
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const isTouchScreen = hasTouchScreen();

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [isRegex, setIsRegex] = useState(false)
  const [searchTriggered, setSearchTriggered] = useState(false)

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
  const handleFileNameChange = (event) => {
    setNewFileName(event.target.value)
  }
  const handleSaveFileName = () => {
    if(!newFileName.endsWith(".txt")){
      toast({
        variant: "destructive",
        description: "File name must end with .txt",
      });
      setNewFileName(fileName)
      return;
    }
    setFileName(newFileName);
    setDialogIsOpen(false)
    toast({
      variant: "success",
      description: "File name updated!",
    });
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
  const handleSearch = (searchText, isRegex) => {
    console.log("Searching for", searchText, "with regex", isRegex);
    setSearchTriggered(true);
  };

  const handleNext = () => {
    console.log("Next");
  };

  const handlePrevious = () => {
    console.log("Previous");
  };

  const handleReplace = (replaceText) => {
    // Implement replace functionality here
  };

  const handleReplaceAll = (searchText, replaceText, isRegex) => {
    // Implement replace all functionality here
  };
  useEffect(() => {
    if(searchTriggered){
      setSearchTriggered(false)
    }
    if(isRegex){
      setIsRegex(false);
    }
  }, [searchOpen]);

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
        <div>
          {isTouchScreen && (
          <div className="w-full px-3 flex items-start justify-start xl:hidden text-xs text-gray-500 mb-2">
            <span>The sync scroll of line numbers and textarea doesnt work well on touch screens.</span>
          </div>
          )}
        </div>
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
      </div>
       )}
      {/* Txt Editor */}
      {fileName && (
        <section className="w-full px-3 md:px-6 flex flex-col">
            <div className="w-full flex flex-row items-center justify-between">
                {/* Filename Display */}
                <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogTrigger asChild className="flex items-center gap-2 text-white font-bold bg-gray-700 px-2 py-1 h-8 w-fit">
                  <div>
                    <div className="font-bold ">{fileName}</div>
                    <FaRegEdit className="text-sm" />
                    {isModified && <div className="w-3 h-3 bg-white rounded-full ml-2" />}
                  </div>
                </DialogTrigger>
                <DialogContent className="mx-4 w-fit mx-auto max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit File Name</DialogTitle>
                    <DialogDescription>
                      Rename the file to something more meaningful.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" value={newFileName} className="col-span-3" onChange={handleFileNameChange}/>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handleSaveFileName}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
                </Dialog>
      
                <div className="flex h-8">
                    <button
                    onClick={handleSave}
                    type="button"
                    disabled={!isModified} // Disable if no changes
                    className={"p-2 text-white bg-gray-700 hover:bg-gray-400 border-r border-gray-300 hidden md:flex"}
                    >
                        <FaRegSave/>
                    </button>
                    <button
                    onClick={handleDownload}
                    type="button"
                    disabled={!fileContent} // Disable if no file content to download
                    className={"p-2 text-white font-bold bg-gray-700 hover:bg-gray-400 border-x border-gray-300 hidden md:flex"}
                    >
                        <FaFileDownload/>
                    </button>
                    <button
                    onClick={handleToggleLineNumbers}
                    type="button"
                    className={"p-2 flex items-center text-white font-bold bg-gray-700 hover:bg-gray-400 border-l border-gray-300 hidden md:flex"}
                    >
                      <FaListOl/>
                    </button>
                    <Search
                      onSearch={handleSearch}
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                      onReplace={handleReplace}
                      onReplaceAll={handleReplaceAll}
                      open={searchOpen}
                      setOpen={setSearchOpen}
                      searchText={searchText}
                      setSearchText={setSearchText}
                      replaceText={replaceText}
                      setReplaceText={setReplaceText}
                      isRegex={isRegex}
                      setIsRegex={setIsRegex}
                    />
                </div>
            </div>
            {/* Text Editor */}
            <Textarea
            fileContent={fileContent}
            onContentChange={handleContentChange}
            lineNumbersVisible={lineNumbersVisible}
            style={{ fontFamily: "monospace" }}
            searchText={searchText}
            isRegex={isRegex}
            searchOpen={searchOpen}
            searchTriggered={searchTriggered}
          />
        </section>
    )}      
    </div>
  );
}

export default TextFileUploader;
