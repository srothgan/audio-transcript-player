import GitHubLink from "./GitHubLink"
import Link from "next/link"
export default function Navbar(){


    return(
        <div className='w-full flex items-center justify-between p-4 bg-white filter drop-shadow-xl '>
            <Link href="/" className='flex flex-col gap-2 italic'>
                <h4>Audio Player</h4>
                <p>For Transcription</p>
            </Link>
            
            <GitHubLink/>
        </div>
    )
}