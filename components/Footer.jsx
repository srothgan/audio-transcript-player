import Link from "next/link";
import GitHubLink from "./GitHubLink";

export default function Footer() {
  return (
    <footer className="w-full p-6 bg-gradient-to-r from-slate-600 to-slate-800 text-white">
      <div className="flex flex-col items-center gap-6 text-center md:grid grid-cols-3 md:justify-between w-full">
        
        {/* GitHub Icon Link */}
        <GitHubLink />
        {/* Project Title */}
        <h4 className="text-xl font-semibold tracking-wider">
          The Audio Transcription Player Project
        </h4>

        {/* Navigation Links */}
        <nav className="flex gap-6 text-sm md:gap-8 md:text-base md:justify-end">
          <Link className="transition hover:text-slate-300" href="/">
            Home
          </Link>
          <Link 
            className="transition hover:text-slate-300"
            href="https://github.com/srothgan/audio-player"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Project
          </Link>
          <Link className="transition hover:text-slate-300" href="/">
            Give Feedback
          </Link>
        </nav>
      </div>

      {/* Bottom Border for Visual Separation */}
      <div className="mt-6 h-[1px] bg-slate-700" />

      {/* Footer Note */}
      <p className="mt-4 text-xs text-center text-slate-400">
        &copy; {new Date().getFullYear()} The Audio Transcription Player Project. <Link className='text-blue-500' href='https://github.com/srothgan/audio-transcript-player/blob/master/LICENSE'>MIT License</Link>.
      </p>
    </footer>
  );
}
