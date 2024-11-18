import React, { useRef, useEffect, useState, useMemo } from "react";
import { FaRegSave, FaFileDownload, FaListOl, FaRegEdit, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
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
import { FaSearch, FaArrowRight } from 'react-icons/fa'
import { VscRegex } from "react-icons/vsc";
import { LuReplace, LuReplaceAll } from "react-icons/lu";


export default function Transcript({fileContent, fileName}){
    const textAreaRef = useRef(null);
    const lineNumberRef = useRef(null);
    const highlightRef = useRef(null);
    const [lineNumbers, setLineNumbers] = useState([]);
    const [lineNumbersVisible, setLineNumbersVisible] = useState(true);
    const [content, setContent] = useState(null);
    const [isModified, setIsModified] = useState(false);
    const [currentFileName, setCurrentFileName] = useState(null);
    const [newFileName, setNewFileName] = useState(null);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [originalContent, setOriginalContent] = useState(fileContent);
    const [searchText, setSearchText] = useState("")
    const [replaceText, setReplaceText] = useState("")
    const [isRegex, setIsRegex] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showSearchUI, setShowSearchUI] = useState(false);
    const [showReplace, setShowReplace] = useState(false)
    const [searchResults, setSearchResults] = useState([]);

    const { toast } = useToast();

    const calculateWrappedLines = (text, textareaWidth, font) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font = font;
    
        const lines = text.split(/\r\n|\r|\n/);
        let lineOffsets = []; // Track line offset for scroll calculations
    
        let totalLines = 0;
        lines.forEach((line) => {
            const words = line.split(' ');
            let currentLine = '';
            words.forEach((word) => {
                const testLine = currentLine + word + ' ';
                const testLineWidth = context.measureText(testLine).width;
                if (testLineWidth > textareaWidth && currentLine !== '') {
                    totalLines++; // Wrapped to a new line
                    lineOffsets.push(totalLines); // Push offset
                    currentLine = word + ' '; // Start a new line
                } else {
                    currentLine = testLine; // Keep appending to the same line
                }
            });
            totalLines++; // Count the final line
            lineOffsets.push(totalLines);
        });
    
        return { totalLines, lineOffsets };
    };      

    const getTextareaMetrics = () => {
        if (!textAreaRef.current) return {};
    
        const computedStyle = window.getComputedStyle(textAreaRef.current);
        const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
        const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
        const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
        const font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
        const lineHeight = parseFloat(computedStyle.lineHeight) || 16;
    
        return {
            usableWidth: textAreaRef.current.clientWidth - paddingLeft - paddingRight,
            font,
            lineHeight,
            paddingTop,
        };
    };    

    const calculateLineNumbers = () => {
        if (textAreaRef.current) {
            const text = textAreaRef.current.value;
    
            const { usableWidth, font } = getTextareaMetrics();
            if (!usableWidth) return;
    
            const updatedLineNumbers = text
                .split(/\r\n|\r|\n/)
                .map((line, index) => {
                    const { totalLines } = calculateWrappedLines(line, usableWidth, font);
                    return Array(totalLines).fill(index + 1);
                })
                .flat();
    
            setLineNumbers(updatedLineNumbers);
        }
    };
    
    const handleScroll = () => {
        if (textAreaRef.current && lineNumberRef.current ) {
            lineNumberRef.current.scrollTop = textAreaRef.current.scrollTop;
        }
        if (textAreaRef.current  && highlightRef.current) {
            highlightRef.current.scrollTop = textAreaRef.current.scrollTop;
        }
    };

    const handleToggleLineNumbers = () => {
        setLineNumbersVisible(!lineNumbersVisible);
    };

    const handleDownload = () => {
        if (!content) {
            toast({
                variant: "destructive",
                description: "No content to download.",
            })
            return;
        }
        if (isModified) {
            toast({
                variant: "warn",
                description: "Unsaved changes. Save before downloading.",
            })
            return;
        }
        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = currentFileName || "untitled.txt";
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const handleSave = () => {
        setOriginalContent(content); // Set current content as the saved state
        setIsModified(false); // Mark as saved
        toast({
          variant: "success",
          description: "Changes saved!",
        })
    };

    const onContentChange = (newContent) => {
        setContent(newContent);
        setIsModified(true);
    };

    const handleSaveFileName = () => {
        if(!newFileName.endsWith(".txt")){
            toast({
              variant: "destructive",
              description: "File name must end with .txt",
            });
            setNewFileName(fileName)
            return;
        }
        if (!newFileName.trim()) {
            toast({
                variant: "destructive",
                description: "Filename cannot be empty.",
            })
            return;
        }
        setCurrentFileName(newFileName.trim());
        setDialogIsOpen(false);
        toast({
            variant: "success",
            description: "Changes saved!",
          })
    };

    const handleFileNameChange = (e) => {
        setNewFileName(e.target.value);
    };

    const highlightedContent = useMemo(() => {
        if (!searchText || searchResults.length === 0) return content;
    
        let matchCount = 0;
    
        return content.replace(new RegExp(searchText, "gi"), (match) => {
            const currentMatchCount = matchCount;
            matchCount++;
            return currentMatchCount === currentIndex
                ? `<mark class="bg-yellow-500">${match}</mark>`
                : `<mark class="bg-yellow-200">${match}</mark>`;
        });
    }, [searchText, searchResults, currentIndex, content]);

    const openSearch = () => {
        setShowSearchUI(!showSearchUI);
        setCurrentIndex(0);
        setIsRegex(false);
        setShowReplace(false);
        setReplaceText("");
    };
    
    const scrollToMatch = (index) => {
        if (!textAreaRef.current || searchResults.length === 0) return;
    
        const textarea = textAreaRef.current;
    
        const matchIndex = searchResults[index];
        const textBeforeMatch = content.substring(0, matchIndex);
    
        const { usableWidth, font, lineHeight, paddingTop } = getTextareaMetrics();
        if (!usableWidth) return;
    
        const { totalLines } = calculateWrappedLines(textBeforeMatch, usableWidth, font);
    
        // Calculate scroll position
        const scrollPosition = totalLines * lineHeight - textarea.clientHeight / 2;
    
        // Apply scrolling
        textarea.scrollTop = scrollPosition > 0 ? scrollPosition + paddingTop : 0;
    
        // Sync scrolling with line numbers and highlights
        handleScroll();
    };
    
    
    const onNext = () => {
        if (searchResults.length === 0) return;
        const nextIndex = currentIndex < searchResults.length - 1 ? currentIndex + 1 : 0;
        setCurrentIndex(nextIndex);
        scrollToMatch(nextIndex);
    };
    
    const onPrevious = () => {
        if (searchResults.length === 0) return;
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : searchResults.length - 1;
        setCurrentIndex(prevIndex);
        scrollToMatch(prevIndex);
    };
    
    const onReplace = () => {
        if (searchResults.length === 0 ) return;
    
        const regex = isRegex
            ? new RegExp(searchText, "gi")
            : new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    
        let matchCount = 0;
        const updatedContent = content.replace(regex, (match) => {
            if (matchCount === currentIndex) {
                matchCount++;
                return replaceText;
            }
            matchCount++;
            return match;
        });
    
        onContentChange(updatedContent); 
    
        // Update search results after replacing
        setSearchResults((prev) => prev.filter((_, index) => index !== currentIndex));
    
        // Adjust current index
        setCurrentIndex((prev) => (prev >= searchResults.length - 1 ? 0 : prev));
        scrollToMatch(currentIndex)
    };
    
    const onReplaceAll = () => {
        if (!searchText || !replaceText) return;
    
        const regex = isRegex
            ? new RegExp(searchText, "gi")
            : new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    
        const updatedContent = content.replace(regex, replaceText);
    
        onContentChange(updatedContent); ;
    
        // Clear search results
        setSearchResults([]);
        setCurrentIndex(0);
        scrollToMatch(0)
        toast({
            variant: "success",
            description: `Replaced all occurrences of "${searchText}" with "${replaceText}".`,
        });
    };

    useEffect(() => {
        setContent(fileContent);
        setOriginalContent(fileContent);
    }, [fileContent]);

    useEffect(() => {
        calculateLineNumbers();
        if (textAreaRef.current && lineNumberRef.current) {
          lineNumberRef.current.scrollTop = textAreaRef.current.scrollTop;
        }
    }, [content, lineNumbersVisible]);

    useEffect(() => {
        setContent(fileContent);
        setCurrentFileName(fileName);   
        setNewFileName(fileName); 
    }, []);

    useEffect(() => {
        if (!searchText) {
            setSearchResults([]);
            return;
        }
    
        const regex = isRegex
            ? new RegExp(searchText, "gi")
            : new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    
        const matches = [];
        let tmp;
    
        while ((tmp = regex.exec(content)) !== null) {
            matches.push(tmp.index);
        }
    
        setSearchResults(matches);
    }, [searchText, content, isRegex]);

    //prevent error message during initial render
    if (content === null) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <p>Loading content...</p>
            </div>
        );
    }

    return(
        <section className='w-full flex flex-col'>
            <div className="w-full flex flex-row items-center justify-between">
                {/* Filename Display */}
                <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogTrigger asChild className="flex items-center gap-2 text-white font-bold bg-gray-700 px-2 py-1 h-8 w-fit">
                  <div>
                    <div className="font-bold ">{currentFileName}</div>
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
                    className={"p-2 flex items-center text-white font-bold bg-gray-700 hover:bg-gray-400 border-x border-gray-300 hidden md:flex"}
                    >
                      <FaListOl/>
                    </button>
                    <button
                    onClick={openSearch}
                    type="button"
                    className={"p-2 flex items-center text-white font-bold bg-gray-700 hover:bg-gray-400 border-l border-gray-300 hidden md:flex"}
                    >
                      <FaSearch/>
                    </button>
                </div>
            </div>
            <div className="flex w-full mb-4 border-2 border-gray-700" style={{ minHeight: "500px", height: "calc(100vh - 490px)", overflow: "hidden" }}>
                {lineNumbersVisible && (
                    <div
                    ref={lineNumberRef}
                    className="w-10 flex items-start flex-col border-r-2 border-slate-300 p-2 overflow-hidden select-none"
                    style={{ minHeight: "500px" }}
                    >
                    {lineNumbers.map((line, index) => (
                        <div key={index} className="text-right text-gray-500">
                        {line === lineNumbers[index-1] ? <p className="text-white">0</p> : line}
                        </div>
                    ))}
                    </div>
                )}
                <div className="relative w-full flex-grow">
                {showSearchUI && (
                    <div className="absolute top-0 right-0 bg-gray-800 p-2 rounded-b-lg rounded-l-lg shadow-lg w-fit z-50 border border-gray-700">
                        {/* Search Row */}
                        <div className="flex items-center space-x-2 mb-2">
                            {/* Toggle Replace Button */}
                            <Button
                                onClick={() => setShowReplace(!showReplace)}
                                size="icon"
                                className="flex items-center justify-center w-8 h-8 bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600"
                            >
                                {showReplace ? <FaArrowDown className="h-4 w-4" /> : <FaArrowRight className="h-4 w-4" />}
                            </Button>

                            {/* Search Input */}
                            <Input
                                type="text"
                                placeholder="Search..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-40 flex-grow bg-gray-700 text-gray-200 placeholder-gray-400 rounded border-none focus:ring-1 focus:ring-blue-500"
                            />

                            {/* Results Display */}
                            <div className="text-gray-400 text-sm w-20 text-left">
                                {searchResults.length > 0 ? `${currentIndex + 1} of ${searchResults.length}` : "0 / 0"}
                            </div>

                            {/* Regex Toggle */}
                            <Button
                                onClick={() => setIsRegex(!isRegex)}
                                size="icon"
                                className={`flex items-center justify-center w-8 h-8 ${
                                    isRegex ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600'
                                }`}
                            >
                                <VscRegex className="h-4 w-4" />
                            </Button>

                            {/* Navigation Buttons */}
                            <Button
                                onClick={onPrevious}
                                size="icon"
                                className="flex items-center justify-center w-8 h-8 bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600"
                            >
                                <FaArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                                onClick={onNext}
                                size="icon"
                                className="flex items-center justify-center w-8 h-8 bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600"
                            >
                                <FaArrowDown className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Replace Row */}
                        {showReplace && (
                            <div className="flex items-center space-x-2">
                                <div className='w-12 h-8'/>
                                {/* Replace Input */}
                                <Input
                                    type="text"
                                    placeholder="Replace with..."
                                    value={replaceText}
                                    onChange={(e) => setReplaceText(e.target.value)}
                                    className="flex-grow bg-gray-700 text-gray-200 placeholder-gray-400 rounded border-none focus:ring-1 focus:ring-blue-500"
                                />

                                {/* Replace Buttons */}
                                <Button
                                    onClick={onReplace}
                                    className="flex items-center justify-center px-3 py-1 bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600"
                                >
                                    <LuReplace/>
                                </Button>
                                <Button
                                    onClick={onReplaceAll}
                                    className="flex items-center justify-center px-3 py-1 bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600"
                                >
                                    <LuReplaceAll/>
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                <div
                    ref={highlightRef}
                    className="absolute inset-0 p-2 whitespace-pre-wrap overflow-y-auto bg-transparent pointer-events-none"
                    style={{ pointerEvents: "none" }}
                    dangerouslySetInnerHTML={{
                        __html: showSearchUI ? highlightedContent : content,
                    }}
                />
                <textarea
                    ref={textAreaRef}
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    onScroll={handleScroll}
                    placeholder="Enter text..."
                    rows={15}
                    className="w-full flex-grow p-2 resize-none rounded-none overflow-y-auto overscroll-none"
                    style={{ minHeight: "500px" }}
                />
        </div> 
            </div>
        </section>
    )
}