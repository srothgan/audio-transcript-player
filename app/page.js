import AudioPlayer from "@/components/AudioPlayer";
import TextFileUploader from "@/components/TranscriptEditor";
export default function Home() {
  return (
    <div className='w-full flex flex-col lg:flex-row gap-4 px-1 md:px-2 xl:px-2 my-4'>
      <div className='w-full lg:w-[35%]'>
        <AudioPlayer />
      </div>
      <div className='w-full lg:w-[65%]'>
        <TextFileUploader/>
      </div>
    </div>
  );
}