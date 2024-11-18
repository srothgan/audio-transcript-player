import GitHubLink from "./GitHubLink";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo.png"
export default function Navbar() {
  return (
    <navbar className='w-full p-1 md:p-2 xl:p-2'>
    <div className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-slate-600 to-slate-800 text-white shadow-md rounded-lg">
      
      {/* Logo and Title */}
      <Link href="/" className="flex flex-row items-center gap-4 italic">
        <Image 
          src={Logo}
          width={70}
          height={70}
          alt="Transcript Editor Logo"/>
          <div className="flex flex-col ">
            <h4 className="text-xl font-semibold tracking-wide">Transcript Editor</h4>
            <p className="text-sm text-slate-300">with Audio Player</p>
          </div>

      </Link>

      {/* GitHub Icon Link */}
      <GitHubLink />
    </div>
    </navbar>
  );
}
