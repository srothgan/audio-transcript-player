import GitHubLink from "./GitHubLink"

export default function Navbar(){


    return(
        <div className='w-full flex items-center justify-between p-4 bg-white filter drop-shadow-xl '>
            <div className='flex flex-col gap-2 italic'>
                <h4>Audio Player</h4>
                <p>For Transcription</p>
            </div>
            
            <GitHubLink/>
        </div>
    )
}