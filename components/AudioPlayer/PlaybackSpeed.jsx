import {FaMinus, FaPlus   } from "react-icons/fa";

export default function PlaybackSpeed({playbackRate, setPlaybackRate }){
    const handleIncreaseSpeed = () => setPlaybackRate((prev) => Math.min(3, Number.parseFloat((prev + 0.1).toFixed(1))));
    const handleDecreaseSpeed = () => setPlaybackRate((prev) => Math.max(0.1, Number.parseFloat((prev - 0.1).toFixed(1))));
   
    return(
        <div className='w-full flex justify-start items-center gap-2 '>
            <label htmlFor='speed' className="text-sm font-medium ">Playback <br/>Speed:</label>
            <div className="flex items-center space-x-2">
                {/* Minus Button */}
                <button
                type="button"
                onClick={handleDecreaseSpeed}
                className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                aria-label="Decrease Speed"
                >
                <FaMinus/>
                </button>

                <div className='w-12 px-3 py-1 border border-slate-500 rounded-lg text-center font-bold'>
                {playbackRate}
                </div>
                

                {/* Plus Button */}
                <button
                type="button"
                onClick={handleIncreaseSpeed}
                className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                aria-label="Increase Speed"
                >
                <FaPlus/>
                </button>
            </div>
        </div>
    )
}