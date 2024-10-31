import React from 'react';
import Link from 'next/link';
const GitHubLink = () => {
  return (
    <Link
      href={"https://github.com/srothgan/audio-player"}
      target="_blank"
      rel="noopener noreferrer"
      className=" z-50"
      aria-label="GitHub Repository"
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-black w-8 h-8 md:w-10 md:h-10 hover:text-gray-700 transition-colors"
      >
        <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.2 3 .9.1-.7.3-1.2.6-1.5-2.5-.3-5.1-1.3-5.1-5.5 0-1.2.4-2.1 1-2.8-.1-.2-.5-1.3.1-2.7 0 0 .8-.3 2.8 1 .7-.2 1.5-.3 2.3-.3s1.6.1 2.3.3c2-.1 2.8-1 2.8-1 .6 1.4.2 2.5.1 2.7.6.7 1 1.7 1 2.8 0 4.2-2.6 5.2-5.1 5.5.3.3.6.8.6 1.6v2.4c0 .4.2.8.8.6 4.5-1.5 7.8-5.8 7.8-10.9 0-6.4-5.1-11.5-11.5-11.5z"/>
      </svg>
    </Link>
  );
};

export default GitHubLink;
