// components/AudioPlayer.js
"use client";
import { useRef, useState, useEffect } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import { MdOutlineForward10, MdOutlineReplay10 } from "react-icons/md";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioFile, setAudioFile] = useState(null);
  const [volume, setVolume] = useState(1);

  // Play or stop audio
  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Handle speed change
  const handleSpeedChange = (event) => {
    const speed = Number.parseFloat(event.target.value);
    setPlaybackRate(speed);
    audioRef.current.playbackRate = speed;
  };

  // Skip forward/backward by 10 seconds
  const skipTime = (amount) => {
    audioRef.current.currentTime += amount;
    setCurrentTime(audioRef.current.currentTime);
  };

  // Handle time input in hh:mm:ss format
  const handleTimeInputChange = (event) => {
    const timeParts = event.target.value.split(":").map(Number);
    const timeInSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
    if (!Number.isNaN(timeInSeconds)) {
      audioRef.current.currentTime = timeInSeconds;
      setCurrentTime(timeInSeconds);
    }
  };

  // Update progress from the range input
  const handleProgressChange = (event) => {
    const timeInSeconds = Number(event.target.value);
    audioRef.current.currentTime = timeInSeconds;
    setCurrentTime(timeInSeconds);
  };

  // Handle volume change
  const handleVolumeChange = (event) => {
    const volume = Number.parseFloat(event.target.value);
    setVolume(volume);
    audioRef.current.volume = volume;
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file?.type.startsWith("audio")) {
      const fileURL = URL.createObjectURL(file);
      setAudioFile(fileURL);
      setCurrentTime(0);
      setIsPlaying(false);
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  // Format time in hh:mm:ss
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Update duration on audio file load
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
    }
  }, [audioFile]);

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md mt-8">
      <div className="mb-4 w-full">
        <label htmlFor='audio' className="font-semibold">Upload Audio File:</label>
        <input
          type="file"
          name='audio'
          accept="audio/*"
          onChange={handleFileUpload}
          className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {audioFile && (
        <>
          {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
          <audio
            ref={audioRef}
            src={audioFile}
            onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          />

          {/* Time Input Field */}
          <div className="flex w-full mb-2">
            <label htmlFor='time' className="text-sm font-medium mr-2">Time:</label>
            <input
              type="text"
              name='time'
              value={formatTime(currentTime)}
              onChange={handleTimeInputChange}
              className="w-24 px-2 py-1 border rounded-lg text-center"
            />
          </div>

          {/* Progress bar */}
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
          </div>

          {/* Controls grid */}
          <div className="grid grid-cols-3 gap-4 w-full mt-4">
            {/* Speed Control */}
            <div className="flex items-center space-x-2">
              <label htmlFor='speed' className="text-sm font-medium">Speed:</label>
              <input
                type="number"
                name='speed'
                step="0.1"
                min="0.1"
                max="3"
                value={playbackRate}
                onChange={handleSpeedChange}
                className="w-16 px-2 py-1 border rounded-lg text-center"
              />
            </div>

            {/* Play, stop, skip buttons */}
            <div className="flex justify-center space-x-2">
              <button
                type="button"
                onClick={() => skipTime(-10)}
                className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                <MdOutlineReplay10 size={25} />
              </button>
              <button
                type="button"
                onClick={togglePlay}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
              >
                {isPlaying ? <FaStop /> : <FaPlay />}
              </button>
              <button
                type="button"
                onClick={() => skipTime(10)}
                className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                <MdOutlineForward10 size={25} />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2 justify-end">
              <label htmlFor='volume' className="text-sm font-medium">Volume:</label>
              <input
                type="range"
                name='volume'
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
