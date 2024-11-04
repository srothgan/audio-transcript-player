// components/AudioPlayer.js
"use client";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DeleteButton from "./AudioPlayer/DeleteButton";
import PlaybackSpeed from "./AudioPlayer/PlaybackSpeed";
import VolumeBar from "./AudioPlayer/VolumeBar";
import CopyClipboardButton from "./AudioPlayer/CopyClipboardButton";
import ActionBar from "./AudioPlayer/ActionBar";
import ProgressBar from "./AudioPlayer/ProgressBar";
import TimeInput from "./AudioPlayer/TimeInput";

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
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      const newHour = Number.parseInt(value, 10) || 0;
      const newTime = newHour * 3600 + Number.parseInt(min, 10) * 60 + Number.parseInt(sec, 10);
      setHour(formatTimeUnit(newHour));
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    } else {
      toast.error("Invalid input in hour field. Only numbers are allowed.");
    }
  };

  // Update currentTime based on manual minute input
  const handleMinuteChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      const newMinute = Number.parseInt(value, 10) || 0;
      const newTime = Number.parseInt(hour, 10) * 3600 + newMinute * 60 + Number.parseInt(sec, 10);
      setMin(formatTimeUnit(newMinute));
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    } else {
      toast.error("Invalid input in minute field. Only numbers are allowed.");
    }
  };

  // Update currentTime based on manual second input
  const handleSecondChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      const newSecond = Number.parseInt(value, 10) || 0;
      const newTime = Number.parseInt(hour, 10) * 3600 + Number.parseInt(min, 10) * 60 + newSecond;
      setSec(formatTimeUnit(newSecond));
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    } else {
      toast.error("Invalid input in second field. Only numbers are allowed.");
    }
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
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className="flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <ToastContainer autoClose={2000} />
      {/* Header */}
      <div className='w-full bg-gradient-to-r from-slate-600 to-slate-800 text-white px-2 py-1 rounded-t-lg'>
        <p className="text-xl font-semibold tracking-wide italic">Audio Player</p>
      </div>
      <div className="flex flex-col w-full px-3 md:px-6  py-3">
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
        </div>
      </div>

      {audioFile && (
        <div className='px-3 md:px-6 pb-6 w-full flex flex-col'>
          {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
          <audio
            ref={audioRef}
            src={audioFile}
            onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          />

          {/* Time Input Field */}
          <div className="flex w-full mb-2">
            <TimeInput
              hour={hour}
              min={min}
              sec={sec}
              handleHourChange={handleHourChange}
              handleMinuteChange={handleMinuteChange}
              handleSecondChange={handleSecondChange}
              setActiveInput={setActiveInput}
            />
            <CopyClipboardButton hour={hour} min={min} sec={sec} />
            <DeleteButton handleDeleteAudio={handleDeleteAudio} />
          </div>

          {/* Progress bar */}
          <ProgressBar
            duration={duration}
            currentTime={currentTime}
            handleProgressChange={handleProgressChange}
            formatTime={formatTime}
          />

          {/* Play, stop, skip buttons */}
          <div className="flex flex-row justify-center items-center w-full mb-4">
            <ActionBar isPlaying={isPlaying} togglePlay={togglePlay} skipTime={skipTime}/>
          </div>

          {/* Controls grid */}
          <div className="flex flex-row justify-between items-center w-full">
            {/* Speed Control */}
            <PlaybackSpeed playbackRate={playbackRate} setPlaybackRate={setPlaybackRate}/>

            {/* Volume Control */}
            <VolumeBar volume={volume} handleVolumeChange={handleVolumeChange}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
