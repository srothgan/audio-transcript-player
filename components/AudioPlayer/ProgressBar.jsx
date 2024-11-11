// components/AudioPlayer/ProgressBar.js
import React from "react";
import { hasTouchScreen } from "@/utils/hasTouch";
export default function ProgressBar({ duration, currentTime, handleProgressChange, formatTime }) {

  const isTouchScreen = hasTouchScreen();

  return (
    <div className="w-full my-4">
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleProgressChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      {isTouchScreen && (
      <div className="flex xl:hidden text-xs text-gray-500 mt-1">
        <span>*The progress bar and time input only become functional on mobile devices and iPads after the audio has been played at least once.</span>
      </div>
      )}
    </div>
  );
}
