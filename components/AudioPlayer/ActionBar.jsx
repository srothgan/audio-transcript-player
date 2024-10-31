import { FaPlay, FaPause} from "react-icons/fa";

export default function ActionBar({isPlaying, togglePlay, skipTime}){

    return(
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
    )
}