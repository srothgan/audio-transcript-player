import GitHubLink from "./GitHubLink";
import Link from "next/link";

export default function Navbar() {
  return (
    <navbar className='w-full p-1 md:p-2 xl:p-2'>
    <div className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-slate-600 to-slate-800 text-white shadow-md rounded-lg">
      
      {/* Logo and Title */}
      <Link href="/" className="flex flex-col gap-1 italic">
        <h4 className="text-xl font-semibold tracking-wide">Audio Player</h4>
        <p className="text-sm text-slate-300">For Transcription</p>
      </Link>

      {/* GitHub Icon Link */}
      <GitHubLink />
    </div>
    </navbar>
  );
}
