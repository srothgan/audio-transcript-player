import AudioPlayer from "@/components/AudioPlayer";
import TextFileUploader from "@/components/TranscriptEditor";
export default function Home() {
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 px-1 md:px-2 xl:px-2 my-4'>
      <AudioPlayer />
      <TextFileUploader/>
    </div>
  );
}