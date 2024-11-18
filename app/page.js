import AudioPlayer from "@/components/AudioPlayer";
import TranscriptEditor from "@/components/TranscriptEditor";
export default function Home() {
  return (
    <div className='w-full flex flex-col lg:flex-row gap-4 px-1 md:px-2 xl:px-2 my-4'>
      <div className='w-full lg:max-w-md'>
        <AudioPlayer />
      </div>
      <div className='w-full flex-grow'>
        <TranscriptEditor/>
      </div>
    </div>
  );
}