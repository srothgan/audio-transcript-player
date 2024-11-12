import React, { useRef, useEffect, useState } from "react";

export default function Textarea({ fileContent, onContentChange, lineNumbersVisible, searchText, isRegex, searchOpen, searchTriggered }) {
  const textAreaRef = useRef(null);
  const lineNumberRef = useRef(null);
  const highlightRef = useRef(null);
  const [lineNumbers, setLineNumbers] = useState([]);
  

  const calculateLineNumbers = () => {
    if (textAreaRef.current) {
      const text = textAreaRef.current.value;
      const lines = text.split(/\r\n|\r|\n/);

      const computedStyle = window.getComputedStyle(textAreaRef.current);
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      const font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
      const usableWidth = textAreaRef.current.clientWidth - paddingLeft - paddingRight;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        context.font = font;
      }

      const updatedLineNumbers = [];

      lines.forEach((line, index) => {
        const words = line.split(' ');
        let currentLine = '';
        let lineCount = 1;

        words.forEach((word) => {
          const testLine = currentLine + word + ' ';
          const width = context.measureText(testLine).width;

          if (width > usableWidth && currentLine !== '') {
            lineCount++;
            currentLine = word + ' ';
          } else {
            currentLine = testLine;
          }
        });

        for (let i = 0; i < lineCount; i++) {
          updatedLineNumbers.push(index + 1);
        }
      });

      setLineNumbers(updatedLineNumbers);
    }
  };

  const handleScroll = () => {
    if (textAreaRef.current && lineNumberRef.current && highlightRef.current) {
        lineNumberRef.current.scrollTop = textAreaRef.current.scrollTop;
        highlightRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  };
  const highlightText = () => {
    if (!searchOpen || !searchText || !searchTriggered) {
      return fileContent;
    }

    const regex = isRegex ? new RegExp(searchText, "gi") : new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");
    return fileContent.replace(regex, (match) => {
      return `<mark class="bg-yellow-200">${match}</mark>`;
    });
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.innerHTML = highlightText();
    }
    console.log("searching for", searchText, "regex", isRegex);
  }, [fileContent, searchText, isRegex]);


  useEffect(() => {
    calculateLineNumbers();
    if (textAreaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  }, [fileContent, lineNumbersVisible]);

  return (
    <div className="flex w-full mb-4 border-2 border-gray-700" style={{ minHeight: "400px", height: "calc(100vh - 490px)", overflow: "hidden" }}>
      {lineNumbersVisible && (
        <div
          ref={lineNumberRef}
          className="w-10 flex items-start flex-col border-r-2 border-slate-300 p-2 overflow-hidden select-none"
          style={{ minHeight: "400px" }}
        >
          {lineNumbers.map((line, index) => (
            <div key={index} className="text-right text-gray-500">
              {line === lineNumbers[index-1] ? <p className="text-white">0</p> : line}
            </div>
          ))}
        </div>
      )}
      <div className="relative w-full flex-grow">

      <div
        ref={highlightRef}
        className="absolute inset-0 p-2 whitespace-pre-wrap overflow-y-auto bg-transparent pointer-events-none p2- rounded-none"
        style={{ pointerEvents: "none" }}
        dangerouslySetInnerHTML={{ __html: highlightText() }}
      />
      <textarea
        ref={textAreaRef}
        value={fileContent}
        onChange={(e) => onContentChange(e.target.value)}
        onScroll={() => handleScroll()}
        placeholder="Enter text..."
        rows={15}
        className="w-full flex-grow p-2 resize-none rounded-none overflow-y-auto"
        style={{ minHeight: "400px" }}
      />
      </div> 
    </div>
  );
}
