import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full px-4 md:px-8 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">About Transcript Editor</h1>
        <p className="text-lg text-gray-600 mt-2">
          Welcome to the Transcript Editor &ndash; a tool designed to seamlessly integrate audio playback with transcript editing.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Why did I make this project?</h2>
        <p className="text-gray-600">
          The Transcript Editor was built with a single goal in mind: simplifying the process of creating or editing a transcript. 
          Whether you need to transcribe a meeting, interview, podcast, or any other audio file, this tool is designed to help. 
          By allowing you to work with the audio file and transcript side by side, it aims to make transcription smoother and more efficient.
        </p>
        <p className="mt-2 text-gray-600">
          I created this web application because I couldn&apos;t find a similar tool. Switching between a text editor and an audio player while 
          transcribing or proof-reading AI-generated transcripts was unnecessarily complicated. This tool solves that problem.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Who am I?</h2>
        <p className="text-gray-600">
          My name is Simon Rothgang, and I&apos;m a student from M&uuml;nster, Germany. When transcribing interviews, I often use 
          <Link className="text-blue-500" href="https://github.com/JuergenFleiss/aTrain"> A-Train</Link>, but I still needed to proofread and check the 
          AI-generated transcripts. I found it challenging to use separate tools for audio and text editing because no tool allowed me to work 
          with both side by side. That&apos;s why I built this tool, and I hope it helps others as much as it has helped me.
        </p>
      </section>

      <section className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Audio Player Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Audio Player</h2>
          <p className="text-gray-600 mb-4">
            The audio player lets you listen to your files while editing transcripts. It&apos;s responsive, lightweight, and supports 
            multiple formats for seamless playback.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Play and pause the audio.</li>
            <li>Use skip buttons to jump between timestamps.</li>
            <li>Adjust playback speed to your liking.</li>
            <li>Control the volume.</li>
            <li>Copy the current timestamp to the clipboard.</li>
          </ul>
        </div>

        {/* Transcript Editor Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Transcript Editor</h2>
          <p className="text-gray-600 mb-4">
            Edit your transcripts with precision using advanced features like find-and-replace, undo/redo, and automatic line numbering. 
            The editor is optimized for performance and works seamlessly with the audio player.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Upload and edit existing files.</li>
            <li>Save and download transcripts.</li>
            <li>Rename transcript files.</li>
            <li>Toggle line numbers on and off.</li>
            <li>Search text with regex and colored highlights.</li>
            <li>Navigate with next and previous buttons with auto-scroll.</li>
            <li>Replace text individually or replace all instances.</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Disclaimer</h2>
        <p className="text-gray-600">
          The information on this website is provided &quot;as is&quot; without warranty of any kind. The author is not responsible for any inaccuracies or omissions.
        </p>
      </section>
    </div>
  );
}
