// components/AudioPlayer/TimeInput.js
import React from "react";
import { useToast } from "@/hooks/use-toast";
export default function TimeInput({
  hour,
  min,
  sec,
  handleHourChange,
  handleMinuteChange,
  handleSecondChange,
  setActiveInput,
}) {
  const { toast } = useToast();
  // Helper function to validate numeric input
  const validateInput = (value, name) => {
    if (!/^\d*$/.test(value)) {
      toast({
        variant: "destructive",
        description: `Invalid input in ${name} field. Only numbers are allowed.`,
      })
      return false;
    }
    return true;
  };

  return (
    <div className="flex items-center space-x-1 bg-white border border-slate-500 rounded-lg px-2 py-1">
      <input
        type="text"
        name="hour"
        value={hour}
        onChange={(e) => {
          if (validateInput(e.target.value, 'hour')) {
            handleHourChange(e);
          }
        }}
        onFocus={() => setActiveInput("hour")}
        onBlur={() => setActiveInput(null)}
        className="w-10 px-2 text-center focus:outline-none"
        placeholder="HH"
      />
      <span>:</span>
      <input
        type="text"
        name="min"
        value={min}
        onChange={(e) => {
          if (validateInput(e.target.value, 'minute')) {
            handleMinuteChange(e);
          }
        }}
        onFocus={() => setActiveInput("minute")}
        onBlur={() => setActiveInput(null)}
        className="w-10 px-2 text-center focus:outline-none"
        placeholder="MM"
      />
      <span>:</span>
      <input
        type="text"
        name="sec"
        value={sec}
        onChange={(e) => {
          if (validateInput(e.target.value, 'second')) {
            handleSecondChange(e);
          }
        }}
        onFocus={() => setActiveInput("second")}
        onBlur={() => setActiveInput(null)}
        className="w-10 px-2 text-center focus:outline-none"
        placeholder="SS"
      />
    </div>
  );
}
