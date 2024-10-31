// components/AudioPlayer/TimeInput.js
import React from "react";

export default function TimeInput({
  hour,
  min,
  sec,
  handleHourChange,
  handleMinuteChange,
  handleSecondChange,
  setActiveInput,
}) {
  return (
    <div className="flex items-center space-x-1 bg-white border border-slate-500 rounded-lg px-2 py-1">
      <input
        type="text"
        name="hour"
        value={hour}
        onChange={handleHourChange}
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
        onChange={handleMinuteChange}
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
        onChange={handleSecondChange}
        onFocus={() => setActiveInput("second")}
        onBlur={() => setActiveInput(null)}
        className="w-10 px-2 text-center focus:outline-none"
        placeholder="SS"
      />
    </div>
  );
}
