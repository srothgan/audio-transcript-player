import Link from "next/link";
import GitHubLink from "./GitHubLink";

export default function Footer() {
  return (
    <footer className="w-full p-6 bg-gradient-to-r from-slate-600 to-slate-800 text-white">
      <div className="flex flex-col items-center gap-6 text-center md:grid grid-cols-3 md:justify-between w-full">
        
        {/* GitHub Icon Link */}
        <GitHubLink />
        {/* Project Title */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-semibold tracking-wider">
            The Transcript Editor 
          </h4>
          <p className="text-gray-200 text-sm">
            Transcript Editor by Simon Rothgang. Edit and manage transcripts for podcasts, meetings, and interviews.
          </p>
        </div>
        {/* Navigation Links */}
        <nav className="grid grid-cols-3 gap-4 text-sm justify-center  md:gap-8 md:text-base md:justify-end">
          <Link className="transition hover:text-slate-300" href="/">
            Home
          </Link>
          <Link 
            className="transition hover:text-slate-300"
            href="/about"
          >
            About
          </Link>
          <Link className="transition hover:text-slate-300" href="/feedback">
            Feedback
          </Link>
        </nav>
      </div>

      {/* Bottom Border for Visual Separation */}
      <div className="mt-6 h-[1px] bg-slate-700" />

      {/* Footer Note */}
      <p className="mt-4 text-xs text-center text-slate-400">
        &copy; {new Date().getFullYear()} The Transcript Editor Project. <Link className='text-blue-500' href='https://github.com/srothgan/audio-transcript-player/blob/master/LICENSE'>MIT License</Link>.
      </p>
    </footer>
  );
}
