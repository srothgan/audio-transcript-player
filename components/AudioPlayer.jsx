// components/AudioPlayer.js
"use client";
import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaTrashAlt, FaCopy, FaMinus, FaPlus   } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const AudioPlayer = () => {
  const audioRef = useRef(null);
  const fileInputRef = useRef(null); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioFile, setAudioFile] = useState(null);
  const [volume, setVolume] = useState(1);

  const [sec, setSec] = useState('00')
  const [min, setMin] = useState('00')
  const [hour, setHour] = useState('00')
  const [activeInput, setActiveInput] = useState(null);

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

  // Update progress bar and set audio's current time
  const handleProgressChange = (event) => {
    const newTime = Number(event.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
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
      toast.error("Please upload a valid audio file.");
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
    const audio = audioRef.current;
    if (audio) {
      audio.onloadedmetadata = () => setDuration(audio.duration);
      audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
    }
  }, [audioFile]);

  const formatTimeUnit = (unit) => unit.toString().padStart(2, "0");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {

    if(activeInput!=="hour"){
      const hours = Math.floor(currentTime / 3600);
      setHour(formatTimeUnit(hours));
    }
    if(activeInput!=="minute"){
      const minutes = Math.floor((currentTime % 3600) / 60);
      setMin(formatTimeUnit(minutes));
    }
    if(activeInput!=="second"){
    const seconds = Math.floor(currentTime % 60);
    setSec(formatTimeUnit(seconds));
    }
    
    
  }, [currentTime, activeInput]);

  const handleHourChange = (event) => {
    const newHour = Number.parseInt(event.target.value, 10) || 0;
    const newTime = newHour * 3600 + Number.parseInt(min, 10) * 60 + Number.parseInt(sec, 10);
    setHour(formatTimeUnit(newHour));
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  // Update currentTime based on manual minute input
  const handleMinuteChange = (event) => {
    const newMinute = Number.parseInt(event.target.value, 10) || 0;
    const newTime = Number.parseInt(hour, 10) * 3600 + newMinute * 60 + Number.parseInt(sec, 10);
    setMin(formatTimeUnit(newMinute));
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  // Update currentTime based on manual second input
  const handleSecondChange = (event) => {
    const newSecond = Number.parseInt(event.target.value, 10) || 0;
    const newTime = Number.parseInt(hour, 10) * 3600 + Number.parseInt(min, 10) * 60 + newSecond;
    setSec(formatTimeUnit(newSecond));
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleDeleteAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Stop playback if audio is playing
      audioRef.current.ontimeupdate = null; // Clear the ontimeupdate handler
    }
    setAudioFile(null); // Clear the audio file
    setCurrentTime(0); // Reset time and playback states
    setDuration(0);
    setIsPlaying(false);
    setPlaybackRate(1);
    setVolume(1);
    
    // Reset time input fields
    setSec('00');
    setMin('00');
    setHour('00');
    
    // Reset active input field
    setActiveInput(null);
  
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input to remove the file name
    }
  }
  const copyToClipboard = () => {
    const formattedTime = `[${hour}:${min}:${sec}]`;
    navigator.clipboard.writeText(formattedTime)
    toast.success("Copied timestamp to Clipboard successfully!");
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className="flex flex-col items-center max-w-3xl md:mx-auto mx-4 p-6 bg-white border border-gray-200 rounded-lg shadow-md mt-8">
      <ToastContainer autoClose={2000} />
      <div className="flex flex-col mb-4 w-full">
        <label htmlFor="audio" className="font-semibold">Upload Audio File:</label>
        <div className="flex items-center gap-4 rounded-lg w-full py-2">
          <input
            type="file"
            name="audio"
            accept="audio/mpeg, audio/mp3, audio/wav, audio/aac, audio/mp4, audio/m4a, audio/ogg, audio/webm, audio/x-aiff, audio/x-wav, audio/flac, audio/opus, audio/3gpp, audio/amr"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="block w-fit text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {audioFile && (
            <button
              type="button"
              onClick={handleDeleteAudio}
              className="hidden md:flex p-2 text-red-500 hover:text-red-700 transition-colors justify-center items-center"
              aria-label="Delete Audio"
            >
              <FaTrashAlt size={18} />
            </button>
          )}
        </div>
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
            <div className="flex items-center space-x-1 bg-white border border-slate-500 rounded-lg px-2 py-1">
              <input
                type="text"
                name="hour"
                value={hour}
                onChange={handleHourChange}
                onFocus={() => setActiveInput("hour")}
                onBlur={() =>setActiveInput(null)}
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
                onBlur={() =>setActiveInput(null)}
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
                onBlur={() =>setActiveInput(null)}
                className="w-10 px-2 text-center focus:outline-none"
                placeholder="SS"
              />
            </div>
            <button
              type="button"
              onClick={copyToClipboard}
              className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              aria-label="Copy current time to clipboard"
            >
              <FaCopy />
            </button>
            <button
              type="button"
              onClick={handleDeleteAudio}
              className="flex md:hidden ml-2 px-2 py-1 bg-slate-200 text-red-600 rounded-lg transition justify-center items-center"
              aria-label="Delete Audio"
            >
              <FaTrashAlt />
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full my-4">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleProgressChange} // Update here
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls grid */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full mt-4">
            {/* Speed Control */}
            <div className="hidden md:flex items-center space-x-2 w-40">
              <label htmlFor='speed' className="text-sm font-medium">Speed:</label>
              <input
                type="number"
                name='speed'
                step="0.1"
                min="0.1"
                max="3"
                value={playbackRate}
                onChange={handleSpeedChange}
                className="w-16 px-2 py-1 border border-slate-500 rounded-lg text-center"
              />
            </div>

            {/* Play, stop, skip buttons */}
            <div className="flex w-full md:w-1/2 justify-between">
              <button
                type="button"
                onClick={() => skipTime(-10)}
                className="hidden md:flex px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                -10s
              </button>
              <button
                type="button"
                onClick={() => skipTime(-5)}
                className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                -5s
              </button>
              <button
                type="button"
                onClick={() => skipTime(-1)}
                className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                -1s
              </button>
              <button
                type="button"
                onClick={togglePlay}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                type="button"
                onClick={() => skipTime(1)}
                className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                +1s
              </button>
              <button
                type="button"
                onClick={() => skipTime(5)}
                className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                +5s
              </button>
              <button
                type="button"
                onClick={() => skipTime(10)}
                className="hidden md:flex px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                +10s
              </button>
            </div>

            {/* Volume Control */}
            <div className="hidden md:flex items-center space-x-2 justify-end w-40">
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

            {/*mobile volumne and speed */}
            <div className='w-full md:hidden flex justify-start items-center gap-4 mt-4'>
              <div className='flex items-center gap-2'>
                <label htmlFor='speed' className="text-sm font-medium">Speed:</label>
                <div className="flex items-center space-x-2">
                  {/* Minus Button */}
                  <button
                    type="button"
                    onClick={() => setPlaybackRate((prev) => Math.max(0.1, Number.parseFloat((prev - 0.1).toFixed(1))))}
                    className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    aria-label="Decrease Speed"
                  >
                    <FaMinus/>
                  </button>

                  {/* Speed Input Field */}
                  <input
                    type="number"
                    name='speed'
                    step="0.1"
                    min="0.1"
                    max="3"
                    value={playbackRate}
                    onChange={handleSpeedChange}
                    className="w-16 px-2 py-1 border border-slate-500 rounded-lg text-center"
                  />

                  {/* Plus Button */}
                  <button
                    type="button"
                    onClick={() => setPlaybackRate((prev) => Math.min(3, Number.parseFloat((prev + 0.1).toFixed(1))))}
                    className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    aria-label="Increase Speed"
                  >
                    <FaPlus/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
