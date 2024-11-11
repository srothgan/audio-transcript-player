'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FaSearch, FaArrowLeft, FaArrowRight, FaExchangeAlt } from 'react-icons/fa'
import { VscRegex } from "react-icons/vsc";
import { LuReplace, LuReplaceAll } from "react-icons/lu";

export default function Search({onSearch, onNext, onPrevious, onReplace, onReplaceAll}){  
  const [open, setOpen] = React.useState(false)
  const [searchText, setSearchText] = React.useState("")
  const [replaceText, setReplaceText] = React.useState("")
  const [isRegex, setIsRegex] = React.useState(false)
  const [showReplace, setShowReplace] = React.useState(false)

  const handleSearch = React.useCallback(() => {
    onSearch(searchText, isRegex)
  }, [searchText, isRegex, onSearch])

  const handleReplace = React.useCallback(() => {
    onReplace(replaceText)
  }, [replaceText, onReplace])

  const handleReplaceAll = React.useCallback(() => {
    onReplaceAll(searchText, replaceText, isRegex)
  }, [searchText, replaceText, isRegex, onReplaceAll])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          className="p-2 flex items-center text-white font-bold bg-gray-700 hover:bg-gray-600 border-l border-gray-300 rounded-none"
        >
          <FaSearch className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" side="left" align="end">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleSearch} size="icon">
              <FaSearch className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
           
                <Button
                onClick={() => setShowReplace(!showReplace)}
                variant="outline"
                className="w-fit"
                >
                <FaExchangeAlt className="h-4 w-4" />
                {/* {showReplace ? "Hide Replace" : "Show Replace"}*/}
                </Button>
            
                <div className="flex items-center space-x-2">
                <Switch
                    id="regex-mode"
                    checked={isRegex}
                    onCheckedChange={setIsRegex}
                />
                <Label htmlFor="regex-mode" className="flex items-center">
                    <VscRegex className="h-4 w-4" />
                </Label>
                </div>
           
            <div className="flex items-center space-x-2">
              <Button onClick={onPrevious} size="icon" variant="outline">
                <FaArrowLeft className="h-4 w-4" />
              </Button>
              <Button onClick={onNext} size="icon" variant="outline">
                <FaArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {showReplace && (
            <div className="flex gap-2 items-center ">
              <Input
                type="text"
                placeholder="Replace with..."
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
              />
              <div className="flex justify-between gap-1 items-center ">
                <Button onClick={handleReplace} variant="secondary">
                  <LuReplace/>
                </Button>
                <Button onClick={handleReplaceAll} variant="secondary">
                  <LuReplaceAll/>
                </Button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}